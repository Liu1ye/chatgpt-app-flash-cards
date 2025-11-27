export interface FlashCardDataItem {
  id: string
  question: string
  answer: string
}

export interface FlashCardDeckProps {
  cards: FlashCardDataItem[]
  className?: string
}

export interface FlashCardData {
  title: string
  description: string
  createAt?: string
  flashCards: FlashCardDataItem[]
}
