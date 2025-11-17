'use client';

import { useState, useEffect, useCallback } from 'react';
import { FlashCard, FlashCardDeck as FlashCardDeckClass } from '@/app/components/FlashCardDeck/FlashCardManager';
import { HintText } from './HintText';
import { NavigationButton } from './NavigationButton';
import { CardStack } from './CardStack';
import { ProgressBar } from './ProgressBar';
import { useIsMobile } from '@/app/hooks';

export interface FlashCardDataItem {
  id: string;
  question: string;
  answer: string;
}

export interface FlashCardDeckProps {
  cards: FlashCardDataItem[];
  className?: string;
}

export interface FlashCardData {
  title: string;
  description: string;
  flashCards: FlashCardDataItem[];
}

export const FlashCardDeck = ({ cards, className = '' }: FlashCardDeckProps) => {
  const [deck] = useState<FlashCardDeckClass>(() => {
    const flashCards = cards.map(
      (card) => new FlashCard(card.id, card.question, card.answer)
    );
    return new FlashCardDeckClass(flashCards)
  });

  const [, forceUpdate] = useState({});
  const refresh = useCallback(() => forceUpdate({}), []);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const {isMobile} = useIsMobile();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [deck, refresh]);

  const handleFlip = () => {
    deck.flipCurrentCard();
    refresh();
  };

  const handleNext = () => {
    if (deck.canGoNext) {
      setDirection('next');
      deck.next();
      refresh();
    }
  };

  const handlePrevious = () => {
    if (deck.canGoPrevious) {
      setDirection('prev');
      deck.previous();
      refresh();
    }
  };

  const handleRefresh = () => {
    deck.reset();
    refresh();
  };

  const handleCollect = () => {
    deck.currentCard?.collect()
    refresh()
  }

  const currentCard = deck.currentCard;
  const nextCard = deck.nextCard;
  const previousCard = deck.previousCard;

  if (!currentCard) {
    return null;
  }

  return (
    <div
      className={`relative w-full h-full rounded-[24px] bg-bg-primary border-[0.5px] border-border-heavy overflow-hidden ${className}`}
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

      <div className='size-full flex-center'>
        {/* Content */}
      <div className="relative flex flex-col h-full w-full max-w-[492px]">
        {/* Top hint text */}
        <HintText show={!deck.hasSeenHint} />

        {/* Card container */}
        <div className="flex-1 flex gap-6 items-center justify-center px-4 py-0">
          {/* Previous button */}
          {
            !isMobile && (
              <NavigationButton
                direction="prev"
                disabled={!deck.canGoPrevious}
                onClick={handlePrevious}
              />
            )
          }

          {/* Cards stack */}
          <CardStack
            currentCard={currentCard}
            nextCard={nextCard}
            previousCard={previousCard}
            direction={direction}
            onFlip={handleFlip}
            onCollect={handleCollect}
          />

          {/* Next button */}
          {
            !isMobile && (
              <NavigationButton
                direction="next"
                disabled={!deck.canGoNext}
                onClick={handleNext}
              />
            )
          }
        </div>

        {/* Footer - Progress bar and controls */}
        {
          isMobile ? (
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
              <NavigationButton
                direction="next"
                disabled={!deck.canGoNext}
                onClick={handleNext}
              />
            </div>
          ) :
          (
            <ProgressBar
              current={deck.currentIndex + 1}
              total={deck.totalCards}
              progress={deck.progress}
              onReset={handleRefresh}
            />
          )
        }
      </div>
      </div>
    </div>
  );
};
