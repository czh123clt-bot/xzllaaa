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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col w-full max-w-xl mx-auto px-4 py-3 h-full justify-between overflow-hidden select-none"
    >
      {/* Navigation Header */}
      <div className="flex items-center justify-between mb-4 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-border bg-blue-card text-[#e2e2e7]/80 text-[10px] font-serif tracking-widest hover:text-white hover:border-sky-400 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
          返回 BACK
        </button>

        {/* Gender Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-border bg-blue-card shadow-[0_0_15px_rgba(0,0,0,0.3)]">
          <span className={`text-[10px] font-serif tracking-wider ${gender === 'male' ? 'text-sky-400' : 'text-pink-400'}`}>
            {gender === 'male' ? '♂ 男士 GENTLEMAN' : '♀ 女士 LADY'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-300 animate-pulse" />
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center mb-3.5 select-none">
        <h2 className="text-lg font-serif text-white tracking-[0.1em] flex items-center justify-center gap-1.5 uppercase">
          选择本命星象
          <Sparkle className="w-4.5 h-4.5 text-sky-300 animate-pulse" />
        </h2>
        <p className="text-[#e2e2e7]/60 text-[10px] mt-1 border-b border-dashed border-blue-border/40 pb-2 max-w-xs mx-auto">
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
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(zodiac)}
              className="relative group overflow-hidden flex flex-col justify-between p-2.5 rounded-lg border border-blue-border bg-gradient-to-b from-blue-card to-deep-blue/40 hover:border-sky-400/40 shadow text-left transition-colors cursor-pointer"
            >
              {/* Colored Glow effect on hover */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${zodiac.color} blur-xl opacity-5 group-hover:opacity-15 transition-opacity duration-300 rounded-full`} />

              {/* Corner Design Trim */}
              <div className="absolute top-1.5 right-2 text-[7px] font-serif tracking-widest text-[#e2e2e7]/30 select-none">
                {zodiac.english.toUpperCase().slice(0, 3)}
              </div>

              {/* Icon Container */}
              <div className="mb-2 text-sky-300 bg-sky-500/10 w-7 h-7 rounded-md flex items-center justify-center border border-sky-450/10 group-hover:bg-sky-400/20 group-hover:text-white group-hover:scale-105 transition-all">
                {getZodiacIcon(zodiac.icon, "w-3.5 h-3.5")}
              </div>

              {/* Name Details */}
              <div className="flex flex-col select-none leading-tight">
                <span className="text-xs font-serif font-bold tracking-widest text-[#e2e2e7] group-hover:text-sky-300 transition-colors">
                  {zodiac.name}
                </span>
                <span className="text-[8px] font-serif uppercase text-[#e2e2e7]/40 tracking-wider mt-0.5">
                  {zodiac.english}
                </span>
                <span className="text-[8px] font-mono text-slate-500 mt-1">
                  {zodiac.date}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Elegant Footer Disclaimer */}
      <div className="flex flex-col items-center gap-1 py-1 mt-2 mx-auto select-none pointer-events-none">
        <span className="text-[10px] text-sky-400/50 font-serif tracking-widest uppercase font-bold animate-pulse">
          ✦ 该应用只娱乐使用 ✦
        </span>
        <span className="text-[7px] text-[#e2e2e7]/20 font-sans tracking-[0.2em] uppercase">
          ✧ CELESTIAL PACT v1.0 ✧
        </span>
      </div>
    </motion.div>
  );
}
