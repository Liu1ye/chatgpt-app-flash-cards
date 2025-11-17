'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FlashCard } from '@/app/components/FlashCardDeck/FlashCardManager';
import { Card } from '../Card';

interface CardStackProps {
  currentCard: FlashCard;
  nextCard: FlashCard | null;
  previousCard: FlashCard | null;
  direction: 'next' | 'prev' | null;
  onFlip: () => void;
  onCollect: () => void
}

export const CardStack = ({ currentCard, nextCard, previousCard, direction, onFlip, onCollect }: CardStackProps) => {
  // Animation variants for the current/exiting card
  const currentCardVariants = {
    enter: (direction: 'next' | 'prev' | null) => {
      // Previous card enters from left (slides in + scales up)
      if (direction === 'prev') {
        return { x: '-160%', scale: 1, y: 0, opacity: 1 };
      }
      // New card enters (already in position, just scales up from background)
      return { x: '0%', scale: 0.915, y: 32, opacity: 0 };
    },
    center: {
      x: '0%',
      scale: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: 'next' | 'prev' | null) => {
      // Going forward: current card slides left
      if (direction === 'next') {
        return { x: '-160%', scale: 1, y: 0, opacity: 1 };
      }
      // Going back: current card shrinks to background position with reduced opacity
      return { x: '0%', scale: 0.915, y: 32, opacity: 0 };
    },
  };

  // Animation variants for the background card (next card preview)
  // Position it slightly lower so bottom edge is visible below the front card
  const backgroundCardVariants = {
    initial: {
      scale: 0.915,
      y: 32,
      opacity: 0.5,
    },
    animate: {
      scale: 0.915,
      y: 32,
      opacity: 0.5,
    },
  };

  return (
    <div className="relative flex-1 size-full">
      {/* Background card (static preview of next card) */}
      {nextCard && (
        <motion.div
          key={`bg-${nextCard.id}`}
          className="absolute left-1/2 -translate-x-1/2 z-[1] w-full"
          variants={backgroundCardVariants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <Card card={nextCard} isBackground />
        </motion.div>
      )}

      {/* Current card with AnimatePresence for smooth transitions */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentCard.id}
          className="absolute left-1/2 -translate-x-1/2 z-[2] w-full"
          custom={direction}
          variants={currentCardVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          <Card card={currentCard} onClick={onFlip} onCollect={onCollect} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
