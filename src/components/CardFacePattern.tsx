import React from 'react';
import { Suit } from '../types';
import { getSuitSymbol } from '../utils/cardUtils';
import { Crown, Shield } from 'lucide-react';

interface CardFacePatternProps {
  value: string;
  suit: Suit;
  isLarge?: boolean;
}

export default function CardFacePattern({ value, suit, isLarge = false }: CardFacePatternProps) {
  const symbol = getSuitSymbol(suit);
  const isRed = suit === 'H' || suit === 'D';
  const colorClass = isRed ? 'text-rose-600' : 'text-[#0f172a]';

  // Sizing definitions depending on card scale
  const sizeS = isLarge ? 'text-base' : 'text-[9px]';
  const sizeM = isLarge ? 'text-2xl' : 'text-xs';
  const sizeL = isLarge ? 'text-4xl' : 'text-lg';
  const sizeXL = isLarge ? 'text-6xl' : 'text-2xl';

  const centerFlexClass = "flex flex-col items-center justify-center h-full w-full";

  // Render based on value
  switch (value) {
    case 'A':
      return (
        <div className={centerFlexClass}>
          <span className={`${sizeXL} ${colorClass} leading-none select-none filter drop-shadow-sm`}>
            {symbol}
          </span>
        </div>
      );

    case '2':
      return (
        <div className="flex flex-col justify-between items-center h-full w-full py-1">
          <span className={`${sizeM} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeM} ${colorClass} select-none rotate-180`}>{symbol}</span>
        </div>
      );

    case '3':
      return (
        <div className="flex flex-col justify-between items-center h-full w-full py-1">
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
        </div>
      );

    case '4':
      return (
        <div className="grid grid-cols-2 content-between justify-items-center h-full w-full py-1 px-1">
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
        </div>
      );

    case '5':
      return (
        <div className="relative w-full h-full py-1 px-1">
          <div className="grid grid-cols-2 content-between justify-items-center h-full">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          </div>
        </div>
      );

    case '6':
      return (
        <div className="grid grid-cols-2 grid-rows-3 content-between justify-items-center h-full w-full py-1 px-1">
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
        </div>
      );

    case '7':
      return (
        <div className="relative w-full h-full py-1 px-1">
          <div className="grid grid-cols-2 grid-rows-3 content-between justify-items-center h-full">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
          <div className="absolute inset-x-0 h-1/2 top-0 flex items-center justify-center">
            <span className={`${sizeS} ${colorClass} translate-y-1 select-none`}>{symbol}</span>
          </div>
        </div>
      );

    case '8':
      return (
        <div className="relative w-full h-full py-1 px-1">
          <div className="grid grid-cols-2 grid-rows-3 content-between justify-items-center h-full">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-around items-center py-2">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
        </div>
      );

    case '9':
      return (
        <div className="relative w-full h-full py-0.5 px-0.5">
          <div className="grid grid-cols-2 content-between justify-items-center h-full py-0.5">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
          </div>
        </div>
      );

    case '10':
      return (
        <div className="relative w-full h-full py-0.5 px-0.5">
          <div className="grid grid-cols-2 content-between justify-items-center h-full py-0.5">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
          <div className="absolute inset-x-0 inset-y-1 flex flex-col justify-between items-center py-0.5">
            <span className={`${sizeS} ${colorClass} select-none`}>{symbol}</span>
            <span className={`${sizeS} ${colorClass} select-none rotate-180`}>{symbol}</span>
          </div>
        </div>
      );

    case 'J':
      return (
        <div className="w-full h-full p-1 flex items-center justify-center relative bg-stone-500/5 select-none overflow-hidden">
          <svg viewBox="0 0 100 140" className={`w-full h-full ${colorClass} opacity-90`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="70" x2="92" y2="70" strokeDasharray="3,3" strokeWidth="1" className="opacity-30" />
            
            {/* TOP JACK */}
            <g>
              <path d="M 33 26 C 33 21 41 16 50 16 C 59 16 67 21 67 26 C 67 29 59 32 50 32 C 41 32 33 29 33 26 Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M 35 28 L 65 28" />
              <path d="M 64 24 L 72 15 L 75 17" strokeWidth="1.2" />
              <path d="M 38 28 Q 50 28 62 28 Q 61 45 50 52 Q 39 45 38 28 Z" />
              <path d="M 44 36 A 1 1 0 0 0 46 36" strokeWidth="2" />
              <path d="M 54 36 A 1 1 0 0 0 56 36" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 30 68 L 36 50 L 44 52 L 44 68" />
              <path d="M 70 68 L 64 50 L 56 52 L 56 68" />
              <path d="M 44 52 L 50 48 L 56 52" />
              <path d="M 23 30 L 23 68" strokeWidth="1.8" />
              <path d="M 17 38 L 23 34 L 29 38 L 23 44 Z" fill="currentColor" fillOpacity="0.15" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>

            {/* BOTTOM JACK */}
            <g transform="translate(100, 140) rotate(180)">
              <path d="M 33 26 C 33 21 41 16 50 16 C 59 16 67 21 67 26 C 67 29 59 32 50 32 C 41 32 33 29 33 26 Z" fill="currentColor" fillOpacity="0.1" />
              <path d="M 35 28 L 65 28" />
              <path d="M 64 24 L 72 15 L 75 17" strokeWidth="1.2" />
              <path d="M 38 28 Q 50 28 62 28 Q 61 45 50 52 Q 39 45 38 28 Z" />
              <path d="M 44 36 A 1 1 0 0 0 46 36" strokeWidth="2" />
              <path d="M 54 36 A 1 1 0 0 0 56 36" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 30 68 L 36 50 L 44 52 L 44 68" />
              <path d="M 70 68 L 64 50 L 56 52 L 56 68" />
              <path d="M 44 52 L 50 48 L 56 52" />
              <path d="M 23 30 L 23 68" strokeWidth="1.8" />
              <path d="M 17 38 L 23 34 L 29 38 L 23 44 Z" fill="currentColor" fillOpacity="0.15" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>
          </svg>
        </div>
      );

    case 'Q':
      return (
        <div className="w-full h-full p-1 flex items-center justify-center relative bg-stone-500/5 select-none overflow-hidden">
          <svg viewBox="0 0 100 140" className={`w-full h-full ${colorClass} opacity-90`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="70" x2="92" y2="70" strokeDasharray="3,3" strokeWidth="1" className="opacity-30" />
            
            {/* TOP QUEEN */}
            <g>
              <path d="M 38 28 L 42 16 L 46 22 L 50 14 L 54 22 L 58 16 L 62 28 Z" fill="currentColor" fillOpacity="0.1" />
              <circle cx="50" cy="11" r="1.5" fill="currentColor" />
              <circle cx="42" cy="14" r="1" fill="currentColor" />
              <circle cx="58" cy="14" r="1" fill="currentColor" />
              <path d="M 38 28 Q 50 26 62 28 Q 64 45 50 54 Q 36 45 38 28 Z" />
              <path d="M 35 28 C 34 40 37 46 40 48" />
              <path d="M 65 28 C 66 40 63 46 60 48" />
              <path d="M 44 36 A 1 1 0 0 0 46 36" strokeWidth="2" />
              <path d="M 54 36 A 1 1 0 0 0 56 36" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 30 68 C 34 52 42 46 50 51 C 58 46 66 52 70 68" />
              <path d="M 44 52 L 50 57 L 56 52" />
              <path d="M 24 49 L 24 66" strokeWidth="1.2" />
              <circle cx="24" cy="45" r="3" fill="currentColor" />
              <path d="M 21 45 Q 24 42 27 45 Q 24 48 21 45 Z" fill="currentColor" fillOpacity="0.2" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>

            {/* BOTTOM QUEEN */}
            <g transform="translate(100, 140) rotate(180)">
              <path d="M 38 28 L 42 16 L 46 22 L 50 14 L 54 22 L 58 16 L 62 28 Z" fill="currentColor" fillOpacity="0.1" />
              <circle cx="50" cy="11" r="1.5" fill="currentColor" />
              <circle cx="42" cy="14" r="1" fill="currentColor" />
              <circle cx="58" cy="14" r="1" fill="currentColor" />
              <path d="M 38 28 Q 50 26 62 28 Q 64 45 50 54 Q 36 45 38 28 Z" />
              <path d="M 35 28 C 34 40 37 46 40 48" />
              <path d="M 65 28 C 66 40 63 46 60 48" />
              <path d="M 44 36 A 1 1 0 0 0 46 36" strokeWidth="2" />
              <path d="M 54 36 A 1 1 0 0 0 56 36" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 30 68 C 34 52 42 46 50 51 C 58 46 66 52 70 68" />
              <path d="M 44 52 L 50 57 L 56 52" />
              <path d="M 24 49 L 24 66" strokeWidth="1.2" />
              <circle cx="24" cy="45" r="3" fill="currentColor" />
              <path d="M 21 45 Q 24 42 27 45 Q 24 48 21 45 Z" fill="currentColor" fillOpacity="0.2" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>
          </svg>
        </div>
      );

    case 'K':
      return (
        <div className="w-full h-full p-1 flex items-center justify-center relative bg-stone-500/5 select-none overflow-hidden">
          <svg viewBox="0 0 100 140" className={`w-full h-full ${colorClass} opacity-90`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="70" x2="92" y2="70" strokeDasharray="3,3" strokeWidth="1" className="opacity-30" />
            
            {/* TOP KING */}
            <g>
              <path d="M 35 30 L 40 18 L 50 25 L 60 18 L 65 30 Z" fill="currentColor" fillOpacity="0.1" />
              <circle cx="50" cy="15" r="2.3" fill="currentColor" />
              <circle cx="40" cy="18" r="1.3" fill="currentColor" />
              <circle cx="60" cy="18" r="1.3" fill="currentColor" />
              <path d="M 38 30 Q 50 28 62 30 Q 62 48 50 56 Q 38 48 38 30 Z" />
              <path d="M 38 30 Q 50 36 62 30" />
              <path d="M 44 38 A 1 1 0 0 0 46 38" strokeWidth="2" />
              <path d="M 54 38 A 1 1 0 0 0 56 38" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 41 49 C 43 51 45 54 50 54 C 55 54 57 51 59 49" />
              <path d="M 28 68 L 38 52 M 72 68 L 62 52" />
              <path d="M 38 52 L 50 48 L 62 52" />
              <path d="M 22 34 L 22 66" strokeWidth="2" />
              <circle cx="22" cy="30" r="2.5" fill="currentColor" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>

            {/* BOTTOM KING */}
            <g transform="translate(100, 140) rotate(180)">
              <path d="M 35 30 L 40 18 L 50 25 L 60 18 L 65 30 Z" fill="currentColor" fillOpacity="0.1" />
              <circle cx="50" cy="15" r="2.3" fill="currentColor" />
              <circle cx="40" cy="18" r="1.3" fill="currentColor" />
              <circle cx="60" cy="18" r="1.3" fill="currentColor" />
              <path d="M 38 30 Q 50 28 62 30 Q 62 48 50 56 Q 38 48 38 30 Z" />
              <path d="M 38 30 Q 50 36 62 30" />
              <path d="M 44 38 A 1 1 0 0 0 46 38" strokeWidth="2" />
              <path d="M 54 38 A 1 1 0 0 0 56 38" strokeWidth="2" />
              <path d="M 47 43 Q 50 45 53 43" />
              <path d="M 41 49 C 43 51 45 54 50 54 C 55 54 57 51 59 49" />
              <path d="M 28 68 L 38 52 M 72 68 L 62 52" />
              <path d="M 38 52 L 50 48 L 62 52" />
              <path d="M 22 34 L 22 66" strokeWidth="2" />
              <circle cx="22" cy="30" r="2.5" fill="currentColor" />
              <text x="76" y="32" className="text-[12px] font-semibold font-serif" fill="currentColor" stroke="none">{symbol}</text>
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className={centerFlexClass}>
          <span className={`${sizeL} ${colorClass} select-none`}>{symbol}</span>
        </div>
      );
  }
}
