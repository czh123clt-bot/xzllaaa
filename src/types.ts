export type Suit = 'S' | 'H' | 'C' | 'D'; // Spades ♠, Hearts ♥, Clubs ♣, Diamonds ♦

export interface Card {
  id: string;
  suit: Suit;
  value: string; // 'A', '2'-'10', 'J', 'Q', 'K'
  isFaceUp: boolean;
}

export interface ZodiacInfo {
  id: string;
  name: string;
  english: string;
  date: string;
  icon: string; // Emoji or Lucide icon key
  firstCard: { suit: Suit; value: string };
  forcedCard: { suit: Suit; value: string };
  color: string; // Tailind gradient / colors
}

export const ZODIACS: ZodiacInfo[] = [
  {
    id: 'aquarius',
    name: '水瓶座',
    english: 'Aquarius',
    date: '1.20 - 2.18',
    icon: 'Droplets',
    firstCard: { suit: 'S', value: 'A' },
    forcedCard: { suit: 'H', value: '4' },
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'pisces',
    name: '双鱼座',
    english: 'Pisces',
    date: '2.19 - 3.20',
    icon: 'Waves',
    firstCard: { suit: 'H', value: '2' },
    forcedCard: { suit: 'C', value: '5' },
    color: 'from-cyan-400 to-blue-500',
  },
  {
    id: 'aries',
    name: '白羊座',
    english: 'Aries',
    date: '3.21 - 4.19',
    icon: 'Flame',
    firstCard: { suit: 'C', value: '3' },
    forcedCard: { suit: 'D', value: '6' },
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'taurus',
    name: '金牛座',
    english: 'Taurus',
    date: '4.20 - 5.20',
    icon: 'Gem',
    firstCard: { suit: 'D', value: '4' },
    forcedCard: { suit: 'S', value: '7' },
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'gemini',
    name: '双子座',
    english: 'Gemini',
    date: '5.21 - 6.21',
    icon: 'Sparkles',
    firstCard: { suit: 'S', value: '5' },
    forcedCard: { suit: 'H', value: '8' },
    color: 'from-yellow-400 to-amber-500',
  },
  {
    id: 'cancer',
    name: '巨蟹座',
    english: 'Cancer',
    date: '6.22 - 7.22',
    icon: 'Moon',
    firstCard: { suit: 'H', value: '6' },
    forcedCard: { suit: 'C', value: '9' },
    color: 'from-teal-400 to-emerald-600',
  },
  {
    id: 'leo',
    name: '狮子座',
    english: 'Leo',
    date: '7.23 - 8.22',
    icon: 'Sun',
    firstCard: { suit: 'C', value: '7' },
    forcedCard: { suit: 'D', value: '10' },
    color: 'from-yellow-500 to-red-500',
  },
  {
    id: 'virgo',
    name: '处女座',
    english: 'Virgo',
    date: '8.23 - 9.22',
    icon: 'Compass',
    firstCard: { suit: 'D', value: '8' },
    forcedCard: { suit: 'S', value: 'J' },
    color: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'libra',
    name: '天秤座',
    english: 'Libra',
    date: '9.23 - 10.23',
    icon: 'Scale',
    firstCard: { suit: 'S', value: '9' },
    forcedCard: { suit: 'H', value: 'Q' },
    color: 'from-pink-400 to-purple-500',
  },
  {
    id: 'scorpio',
    name: '天蝎座',
    english: 'Scorpio',
    date: '10.24 - 11.22',
    icon: 'Eye',
    firstCard: { suit: 'H', value: '10' },
    forcedCard: { suit: 'C', value: 'K' },
    color: 'from-red-700 to-purple-900',
  },
  {
    id: 'sagittarius',
    name: '射手座',
    english: 'Sagittarius',
    date: '11.23 - 12.21',
    icon: 'Zap',
    firstCard: { suit: 'C', value: 'J' },
    forcedCard: { suit: 'D', value: 'A' },
    color: 'from-indigo-400 to-purple-600',
  },
  {
    id: 'capricorn',
    name: '摩羯座',
    english: 'Capricorn',
    date: '12.22 - 1.19',
    icon: 'Shield',
    firstCard: { suit: 'D', value: 'Q' },
    forcedCard: { suit: 'S', value: '2' },
    color: 'from-slate-600 to-slate-800',
  },
];

export interface AppState {
  gender: 'male' | 'female' | null;
  selectedZodiac: ZodiacInfo | null;
  history: string[]; // For tracking log/flow
}
