import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, Waves, Flame, Gem, Sparkles, Moon, Sun, 
  Compass, Scale, Eye, Zap, Shield, ArrowLeft, Sparkle
} from 'lucide-react';
import { ZodiacInfo, ZODIACS } from '../types';

interface ZodiacSelectionProps {
  key?: React.Key;
  gender: 'male' | 'female';
  onSelect: (zodiac: ZodiacInfo) => void;
  onBack: () => void;
}

// Map key string to Lucide React component
function getZodiacIcon(key: string, className: string) {
  switch (key) {
    case 'Droplets': return <Droplets className={className} />;
    case 'Waves': return <Waves className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Gem': return <Gem className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Moon': return <Moon className={className} />;
    case 'Sun': return <Sun className={className} />;
    case 'Compass': return <Compass className={className} />;
    case 'Scale': return <Scale className={className} />;
    case 'Eye': return <Eye className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Shield': return <Shield className={className} />;
    default: return <Sparkle className={className} />;
  }
}

export default function ZodiacSelection({ gender, onSelect, onBack }: ZodiacSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col w-full max-w-xl mx-auto px-4 py-3 h-full justify-between overflow-hidden select-none"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 text-[10px] font-serif tracking-widest hover:text-black hover:border-zinc-800 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-500" />
          返回 BACK
        </button>

        {/* Gender Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-200 bg-white shadow-sm">
          <span className="text-[10px] font-serif tracking-wider text-zinc-700">
            {gender === 'male' ? '♂ 男士 GENTLEMAN' : '♀ 女士 LADY'}
          </span>
          <span className="w-1 h-1 rounded-full bg-zinc-300" />
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-4 select-none">
        <h2 className="text-xl font-serif text-zinc-950 tracking-[0.1em] flex items-center justify-center gap-2 uppercase">
          选择本命星象
          <Sparkle className="w-4 h-4 text-zinc-500" />
        </h2>
        <p className="text-zinc-500 font-serif text-[10px] mt-1.5 border-b border-dashed border-zinc-200 pb-2.5 max-w-xs mx-auto">
          听从十二星宿之音，铺展专属命运格谱
        </p>
      </div>

      {/* Zodiac Cards Grid */}
      <div className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto max-h-[72vh] pb-3 pr-0.5">
        {ZODIACS.map((zodiac, index) => {
          return (
            <motion.button
              key={zodiac.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.02, duration: 0.3 }}
              whileHover={{ scale: 1.02, borderColor: '#18181b' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(zodiac)}
              className="relative group overflow-hidden flex flex-col justify-between p-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50/50 shadow-sm text-left transition-all cursor-pointer"
            >
              {/* Corner Design Trim */}
              <div className="absolute top-1.5 right-2 text-[7px] font-serif tracking-widest text-zinc-400 select-none">
                {zodiac.english.toUpperCase().slice(0, 3)}
              </div>

              {/* Icon Container */}
              <div className="mb-2.5 text-zinc-600 bg-zinc-50 w-7 h-7 rounded-md flex items-center justify-center border border-zinc-200 group-hover:bg-zinc-950 group-hover:text-white transition-all">
                {getZodiacIcon(zodiac.icon, "w-3.5 h-3.5")}
              </div>

              {/* Name Details */}
              <div className="flex flex-col select-none leading-tight">
                <span className="text-xs font-serif font-bold tracking-widest text-zinc-800 group-hover:text-black transition-colors">
                  {zodiac.name}
                </span>
                <span className="text-[8px] font-serif uppercase text-zinc-400 tracking-wider mt-0.5">
                  {zodiac.english}
                </span>
                <span className="text-[8px] font-mono text-zinc-500 mt-1">
                  {zodiac.date}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Elegant Footer Disclaimer removed as requested */}
      <div className="flex flex-col items-center gap-1 py-1 mt-2 mx-auto select-none pointer-events-none">
        {/* Disclaimers removed */}
      </div>
    </motion.div>
  );
}
