'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { StartIcon, StartFilledIcon } from '@/app/assets/icons'
import { FlashCard } from '../FlashCardManager'

interface CardProps {
  card: FlashCard
  isBackground?: boolean
  onClick?: () => void
  onCollect?: () => void
}

export const Card = ({ card, isBackground = false, onClick, onCollect }: CardProps) => {
  const { t } = useTranslation()

  const containerClasses = isBackground
    ? 'border border-border-default bg-bg-primary rounded-[32px] p-[29.305px] flex flex-col gap-[9.158px] w-full h-[426px]'
    : 'border border-border-default bg-bg-primary rounded-[32px] p-8 flex flex-col gap-[10px] h-full shadow-[inset_0px_-3px_4px_0px_var(--color-utility-scrollbar)]'

  const textClasses = isBackground
    ? 'text-[25.64px] leading-[36.632px]'
    : 'text-[28px] leading-[40px]'

  const hintTextClasses = isBackground
    ? 'text-[12.82px] leading-[16.484px]'
    : 'text-[14px] leading-[18px]'

  if (isBackground) {
    return (
      <div className={containerClasses} style={{ pointerEvents: 'none' }}>
        <div className="flex-1 flex items-start justify-center overflow-hidden px-2">
          <p
            className={`${textClasses} tracking-[0.38px] text-text-primary font-medium break-words whitespace-pre-wrap w-full`}
          >
            {card.question}
          </p>
        </div>
        <p className={`${hintTextClasses} tracking-[-0.3px] text-text-tertiary font-normal`}>
          {t('card.seeans')}
        </p>
      </div>
    )
  }

  return (
    <motion.div
      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
      className="cursor-pointer w-full h-[426px]"
    >
      {/* Front of card */}
      <div
        className="absolute inset-0 backface-hidden"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        <div className={containerClasses}>
          <div className="flex-1 flex items-start justify-center overflow-hidden px-2">
            <p
              className={`${textClasses} tracking-[0.38px] text-text-primary font-medium break-words whitespace-pre-wrap w-full`}
            >
              {card.question}
            </p>
          </div>
          <div
            className={`${hintTextClasses} flex justify-between tracking-[-0.3px] text-text-tertiary font-normal`}
          >
            <span>{card.getDisplayText() && t(card.getDisplayText() as string)}</span>
            <span
              onClick={(e) => {
                e.stopPropagation()
                onCollect?.()
              }}
            >
              {card.isCollected ? (
                <StartFilledIcon className="text-assistive-yellow-normal hover:text-assistive-yellow-hover " />
              ) : (
                <StartIcon className="text-icon-secondary hover:text-text-primary" />
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Back of card */}
      <div
        className="absolute inset-0 backface-hidden"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}
      >
        <div className={containerClasses}>
          <div className="flex-1 flex items-start justify-center overflow-hidden px-2">
            <p
              className={`${textClasses} tracking-[0.38px] text-text-primary font-medium break-words whitespace-pre-wrap w-full`}
            >
              {card.answer}
            </p>
          </div>
          <p className={`${hintTextClasses} tracking-[-0.3px] text-text-tertiary font-normal`}>
            {/* Empty space for alignment */}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
