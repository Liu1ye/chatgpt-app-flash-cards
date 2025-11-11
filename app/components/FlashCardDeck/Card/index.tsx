'use client';

import { motion } from 'framer-motion';
import { FlashCard } from '@/app/components/FlashCardDeck/FlashCardManager';
import { useTranslation } from 'react-i18next';

interface CardProps {
  card: FlashCard;
  isBackground?: boolean;
  onClick?: () => void;
}

export const Card = ({ card, isBackground = false, onClick }: CardProps) => {

  const { t } = useTranslation();

  const containerClasses = isBackground
    ? 'border border-border-default bg-bg-primary rounded-[32px] p-[29.305px] flex flex-col gap-[9.158px] w-full md:h-[449px] h-[381px]'
    : 'border border-border-default bg-bg-primary rounded-[32px] p-8 flex flex-col gap-[10px] h-full shadow-[inset_0px_-3px_4px_0px_var(--color-utility-scrollbar)]';

  const textClasses = isBackground
    ? 'text-[25.64px] leading-[36.632px]'
    : 'text-[28px] leading-[40px]';

  const hintTextClasses = isBackground
    ? 'text-[12.82px] leading-[16.484px]'
    : 'text-[14px] leading-[18px]';

  if (isBackground) {
    return (
      <div className={containerClasses} style={{ pointerEvents: 'none' }}>
        <div className="flex-1 flex items-start justify-center overflow-hidden">
          <p className={`${textClasses} tracking-[0.38px] text-text-primary font-medium`}>
            {card.question}
          </p>
        </div>
        <p className={`${hintTextClasses} tracking-[-0.3px] text-text-tertiary font-normal`}>
          {t('card.seeans')}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
      style={{ transformStyle: 'preserve-3d' }}
      onClick={onClick}
      className="cursor-pointer w-full md:h-[449px] h-[381px]"
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
          <div className="flex-1 flex items-start justify-center overflow-hidden">
            <p className={`${textClasses} tracking-[0.38px] text-text-primary font-medium`}>
              {card.question}
            </p>
          </div>
          <p className={`${hintTextClasses} tracking-[-0.3px] text-text-tertiary font-normal`}>
            {card.getDisplayText()}
          </p>
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
          <div className="flex-1 flex items-start justify-center overflow-hidden">
            <p className={`${textClasses} tracking-[0.38px] text-text-primary font-medium`}>
              {card.answer}
            </p>
          </div>
          <p className={`${hintTextClasses} tracking-[-0.3px] text-text-tertiary font-normal`}>
            {/* Empty space for alignment */}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
