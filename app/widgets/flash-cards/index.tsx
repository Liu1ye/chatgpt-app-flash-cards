'use client'

import { useState, useEffect, useCallback, useMemo, FC } from 'react'
import { motion } from 'framer-motion'
import { HintText } from './HintText'
import { NavigationButton } from './NavigationButton'
import { CardStack } from './CardStack'
import { ProgressBar } from './ProgressBar'
import { useCallTool, useIsMobile, useWidgetProps, useWidgetState } from '@/app/hooks'
import { Skeleton } from '@/app/components/Skeleton'
import { FlashCardData } from '../types'
import { FlashCard, FlashCardDeck as FlashCardDeckClass } from './FlashCardManager'
import { useToast } from '@/app/context/toastContext'
import GPTButton from '@/app/components/GPTButton'
import { ArrowLeftLgIcon } from '@/app/assets/icons'
import { useTranslation } from 'react-i18next'

type FlashCardsProps = {
  flashCardsDataFromList?: FlashCardData
  isFromList?: boolean
  onClickBackToList?: () => void
}

const FlashCards: FC<FlashCardsProps> = (props) => {
  const { flashCardsDataFromList, isFromList = false, onClickBackToList } = props

  const widgetProps = useWidgetProps<{ language?: string; data?: FlashCardData }>()
  const [widgetState, setWidgetState] = useWidgetState({
    saved: false,
  })
  const callTool = useCallTool()
  const questionData = flashCardsDataFromList || widgetProps?.data

  const { t } = useTranslation()

  const deck = useMemo(() => {
    if (!questionData?.flashCards) return null
    const flashCards = questionData?.flashCards.map(
      (card) => new FlashCard(card.id, card.question, card.answer)
    )
    return new FlashCardDeckClass(flashCards!)
  }, [questionData])

  const [, forceUpdate] = useState({})
  const refresh = useCallback(() => forceUpdate({}), [])
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null)
  const { isMobile } = useIsMobile()
  const { showToast } = useToast()

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault()
        handleFlip()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [deck, refresh])

  useEffect(() => {
    if (isFromList || !questionData) return
    if (widgetState.saved) {
      return
    }
    saveFlashCards()
  }, [])

  const saveFlashCards = async () => {
    try {
      ;(await callTool('fetch', {
        id: '/library/v1/flashcard',
        method: 'POST',
        payload: {
          data: { ...questionData, cards: questionData?.flashCards },
          wisebaseId: 'inbox',
        },
      })) as any
      setWidgetState({ saved: true })
    } catch (error) {}
  }

  const handleFlip = () => {
    deck?.flipCurrentCard()
    refresh()
  }

  const handleNext = () => {
    if (deck?.canGoNext) {
      setDirection('next')
      deck.next()
      refresh()
    }
  }

  const handlePrevious = () => {
    if (deck?.canGoPrevious) {
      setDirection('prev')
      deck.previous()
      refresh()
    }
  }

  const handleRefresh = () => {
    deck?.reset()
    refresh()
  }

  const handleCollect = () => {
    // window?.openai?.callTool('fetch', {})
    showToast('111', 'success', 1500, {
      label: 'View',
      onClick: () => {
        console.log(111)
      },
    })
    deck?.currentCard?.collect()
    refresh()
  }

  const currentCard = deck?.currentCard
  const nextCard = deck?.nextCard
  const previousCard = deck?.previousCard

  if (!deck) {
    return <Skeleton />
  }

  if (!currentCard) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative max-w-[800px] h-[564px] w-full rounded-[24px] bg-bg-primary border-[0.5px] border-border-heavy overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src="/images/card-bg.png"
          alt=""
          className="absolute w-[1094px] h-[820px] blur-2xl opacity-80"
          style={{ mixBlendMode: 'normal' }}
        />
      </div>
      {isFromList && (
        <GPTButton
          className="text-text-inverted-static cursor-pointer absolute pt-[16px]"
          onClick={onClickBackToList && onClickBackToList}
          variant="text"
          icon={<ArrowLeftLgIcon size={12} />}
        >
          {t('card.back')}
        </GPTButton>
      )}
      <div className="size-full flex-center">
        {/* Content */}
        <div className="relative flex flex-col h-full w-full max-w-[492px]">
          {/* Top hint text */}
          <HintText show={!deck.hasSeenHint} />

          {/* Card container */}
          <div className="flex-1 flex gap-6 items-center justify-center px-4 py-0">
            {/* Previous button */}
            {!isMobile && (
              <NavigationButton
                direction="prev"
                disabled={!deck.canGoPrevious}
                onClick={handlePrevious}
              />
            )}

            {/* Cards stack */}
            <CardStack
              currentCard={currentCard}
              nextCard={nextCard!}
              previousCard={previousCard!}
              direction={direction}
              onFlip={handleFlip}
              onCollect={handleCollect}
            />

            {/* Next button */}
            {!isMobile && (
              <NavigationButton direction="next" disabled={!deck.canGoNext} onClick={handleNext} />
            )}
          </div>

          {/* Footer - Progress bar and controls */}
          {isMobile ? (
            <div className="flex gap-2 items-center justify-between px-[16px]">
              <NavigationButton
                direction="prev"
                disabled={!deck.canGoPrevious}
                onClick={handlePrevious}
              />
              <ProgressBar
                current={deck.currentIndex + 1}
                total={deck.totalCards}
                progress={deck.progress}
                onReset={handleRefresh}
              />
              <NavigationButton direction="next" disabled={!deck.canGoNext} onClick={handleNext} />
            </div>
          ) : (
            <ProgressBar
              current={deck.currentIndex + 1}
              total={deck.totalCards}
              progress={deck.progress}
              onReset={handleRefresh}
            />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default FlashCards
