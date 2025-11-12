'use client';

import { FlashCardDeck, FlashCardData } from '@/app/components/FlashCardDeck';
import { FlashCardSkeleton } from '@/app/components/FlashCardDeck/FlashCardSkeleton';
import { useWidgetProps } from '../hooks';


export default function FlashCardsPage() {

  const widgetProps = useWidgetProps<{ language?: string; data?: FlashCardData }>();
  const questionData = widgetProps?.data;

  // if(!questionData?.flashCards){
  //   return <FlashCardSkeleton />
  // }

  return (
    <div className="w-full bg-bg-secondary flex items-center justify-center">
      <div className="w-full max-w-[800px] md:h-[587px] h-[521px]">
        <FlashCardDeck cards={questionData?.flashCards || [{
          id: '1',
          question: 'What is the capital of France?',
          answer: 'Paris',
        }, {
          id: '2',
          question: 'What is the capital of Germany?',
          answer: 'Berlin',
        }, {
          id: '3',
          question: 'What is the capital of Italy?',
          answer: 'Rome',
        }]}/>
      </div>
    </div>
  );
}
