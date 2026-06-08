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

  // Randomize first card's suit
  const SUITS: Suit[] = ['S', 'H', 'C', 'D'];
  const randomFirstSuit = SUITS[Math.floor(Math.random() * 4)];

  // 1. Create the first card with randomized suit and original value
  const firstCard: Card = {
    id: `first-${zodiac.id}`,
    suit: randomFirstSuit,
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

  const firstCardColor = (firstCard.suit === 'H' || firstCard.suit === 'D') ? 'red' : 'black';
  const forcedCardColor = (forcedCard.suit === 'H' || forcedCard.suit === 'D') ? 'red' : 'black';

  // We want the total of red cards in the 9 cards to be either 4 or 5.
  const targetRedCount = Math.random() < 0.5 ? 4 : 5;
  
  // Calculate existing red cards among first and forced cards
  let existingRedCount = 0;
  if (firstCardColor === 'red') existingRedCount++;
  if (forcedCardColor === 'red') existingRedCount++;

  const neededRed = targetRedCount - existingRedCount;
  const neededBlack = 7 - neededRed;

  // Now build separate pools of red and black cards
  const redPool: { suit: Suit; value: string }[] = [];
  const blackPool: { suit: Suit; value: string }[] = [];

  const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  for (const s of SUITS) {
    const isRed = s === 'H' || s === 'D';
    for (const v of VALUES) {
      // Exclude firstCard and forcedCard to avoid duplicates
      const isFirst = s === firstCard.suit && v === firstCard.value;
      const isForced = s === forcedCard.suit && v === forcedCard.value;
      if (!isFirst && !isForced) {
        if (isRed) {
          redPool.push({ suit: s, value: v });
        } else {
          blackPool.push({ suit: s, value: v });
        }
      }
    }
  }

  // Shuffle pools
  const shuffledRed = [...redPool].sort(() => Math.random() - 0.5);
  const shuffledBlack = [...blackPool].sort(() => Math.random() - 0.5);

  // Take the required amount
  const selectedRed = shuffledRed.slice(0, neededRed);
  const selectedBlack = shuffledBlack.slice(0, neededBlack);

  // Combine and map to Card objects
  const random7Pool = [...selectedRed, ...selectedBlack];
  // Shuffle them so they don't appear grouped by color
  const shuffledRandom7Pool = random7Pool.sort(() => Math.random() - 0.5);

  const random7 = shuffledRandom7Pool.map((c, i) => ({
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
