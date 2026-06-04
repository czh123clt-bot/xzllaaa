import { Card, Suit, ZodiacInfo } from '../types';

// Standard values and suits
const SUITS: Suit[] = ['S', 'H', 'C', 'D'];
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function getSuitSymbol(suit: Suit): string {
  switch (suit) {
    case 'S': return '♠';
    case 'H': return '♥';
    case 'C': return '♣';
    case 'D': return '♦';
  }
}

export function getSuitName(suit: Suit): string {
  switch (suit) {
    case 'S': return '黑桃';
    case 'H': return '红桃';
    case 'C': return '梅花';
    case 'D': return '方片';
  }
}

export function getSuitColor(suit: Suit): string {
  return suit === 'H' || suit === 'D' ? 'text-rose-500' : 'text-slate-900 dark:text-white';
}

export function generateTrickCards(zodiac: ZodiacInfo): Card[] {
  const result: Card[] = [];

  // 1. Create the fixed first card
  const firstCard: Card = {
    id: `first-${zodiac.id}`,
    suit: zodiac.firstCard.suit,
    value: zodiac.firstCard.value,
    isFaceUp: false,
  };

  // 2. Create the forced choice card
  const forcedCard: Card = {
    id: `forced-${zodiac.id}`,
    suit: zodiac.forcedCard.suit,
    value: zodiac.forcedCard.value,
    isFaceUp: false,
  };

  // 3. Generate a pool of other 50 cards
  const pool: { suit: Suit; value: string }[] = [];
  for (const s of SUITS) {
    for (const v of VALUES) {
      const isFirst = s === zodiac.firstCard.suit && v === zodiac.firstCard.value;
      const isForced = s === zodiac.forcedCard.suit && v === zodiac.forcedCard.value;
      if (!isFirst && !isForced) {
        pool.push({ suit: s, value: v });
      }
    }
  }

  // Shuffle the pool
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

  // Take 7 random cards from the pool
  const random7 = shuffledPool.slice(0, 7).map((c, i) => ({
    id: `random-${i}-${zodiac.id}`,
    suit: c.suit,
    value: c.value,
    isFaceUp: false,
  }));

  // Create an array of 8 cards containing the forced card and the 7 random cards
  const remaining8 = [forcedCard, ...random7];
  
  // Shuffle these 8 cards
  const shuffled8 = remaining8.sort(() => Math.random() - 0.5);

  // The final array consists of the firstCard fixed at index 0, followed by the shuffled 8 cards
  result.push(firstCard);
  result.push(...shuffled8);

  return result;
}
