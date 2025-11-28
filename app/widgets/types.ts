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
  id?: string
  title: string
  description: string
  createAt?: string
  flashCards: FlashCardDataItem[]
}

export interface FlashCardsResponse {
  total: string
  items: {
    id: string
    userId: string
    wisebaseId: string
    data: FlashCardData
  }[]
}
