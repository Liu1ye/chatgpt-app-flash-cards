/**
 * FlashCard class - Represents a single flash card with question and answer
 */
export class FlashCard {
  private _id: string;
  private _question: string;
  private _answer: string;
  private _isFlipped: boolean;

  constructor(id: string, question: string, answer: string) {
    this._id = id;
    this._question = question;
    this._answer = answer;
    this._isFlipped = false;
  }

  // Getters
  get id(): string {
    return this._id;
  }

  get question(): string {
    return this._question;
  }

  get answer(): string {
    return this._answer;
  }

  get isFlipped(): boolean {
    return this._isFlipped;
  }

  // Methods
  flip(): void {
    this._isFlipped = !this._isFlipped;
  }

  reset(): void {
    this._isFlipped = false;
  }

  getCurrentContent(): string {
    return this._isFlipped ? this._answer : this._question;
  }

  getDisplayText(): string {
    return this._isFlipped ? '' : 'See answer';
  }
}

/**
 * FlashCardDeck class - Manages a collection of flash cards
 */
export class FlashCardDeck {
  private _cards: FlashCard[];
  private _currentIndex: number;
  private _hasSeenHint: boolean;

  constructor(cards: FlashCard[]) {
    this._cards = cards;
    this._currentIndex = 0;
    this._hasSeenHint = false;
  }

  // Getters
  get cards(): FlashCard[] {
    return this._cards;
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  get currentCard(): FlashCard | null {
    return this._cards[this._currentIndex] || null;
  }

  get nextCard(): FlashCard | null {
    return this._cards[this._currentIndex + 1] || null;
  }

  get previousCard(): FlashCard | null {
    return this._cards[this._currentIndex - 1] || null;
  }

  get totalCards(): number {
    return this._cards.length;
  }

  get progress(): number {
    return this.totalCards > 0 ? ((this._currentIndex + 1) / this.totalCards) * 100 : 0;
  }

  get hasSeenHint(): boolean {
    return this._hasSeenHint;
  }

  get canGoNext(): boolean {
    return this._currentIndex < this._cards.length - 1;
  }

  get canGoPrevious(): boolean {
    return this._currentIndex > 0;
  }

  // Methods
  next(): boolean {
    if (this.canGoNext) {
      this._currentIndex++;
      this.currentCard?.reset();
      this._hasSeenHint = true;
      return true;
    }
    return false;
  }

  previous(): boolean {
    if (this.canGoPrevious) {
      this._currentIndex--;
      this.currentCard?.reset();
      this._hasSeenHint = true;
      return true;
    }
    return false;
  }

  flipCurrentCard(): void {
    this.currentCard?.flip();
  }

  reset(): void {
    this._currentIndex = 0;
    this._hasSeenHint = false;
    this._cards.forEach(card => card.reset());
  }

  dismissHint(): void {
    this._hasSeenHint = true;
  }
}
