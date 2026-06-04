import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Compass } from 'lucide-react';

interface GenderSelectionProps {
  key?: React.Key;
  onSelect: (gender: 'male' | 'female') => void;
}

export default function GenderSelection({ onSelect }: GenderSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto h-full w-full select-none"
    >
      {/* Decorative Brand Header */}
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 rounded-full border border-blue-border flex items-center justify-center bg-blue-card shadow-[0_0_20px_rgba(56,189,248,0.1)]"
        >
          <Compass className="w-7 h-7 text-sky-400" />
        </motion.div>
        <div className="absolute -top-1 -right-1">
          <Sparkles className="w-4 h-4 text-sky-300 animate-pulse" />
        </div>
      </div>

      <h1 className="text-2xl font-serif tracking-[0.2em] text-white mb-2 uppercase">
        寻找幸运牌
      </h1>
      <div className="flex flex-col items-center gap-1.5 mb-8">
        <p className="text-[#e2e2e7]/70 text-xs max-w-xs font-sans leading-relaxed tracking-wide">
          “听从星宿的召唤，探知你命运长河中的守护王牌”
        </p>
        <span className="text-[10px] text-sky-400/50 font-serif tracking-widest font-bold">
          （该应用只娱乐使用）
        </span>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-6">
        {/* Male Choice */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('male')}
          className="relative group overflow-hidden rounded-2xl border border-blue-border bg-gradient-to-b from-blue-card to-deep-blue p-6 flex flex-col items-center justify-center gap-3.5 shadow-lg transition-all hover:border-sky-400/40"
        >
          <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-300 border border-sky-500/20">
            <span className="text-xl font-serif font-bold">♂</span>
          </div>
          <span className="text-sm font-serif tracking-widest text-[#e2e2e7] group-hover:text-sky-300 transition-colors">
            男士
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-serif">GENTLEMAN</span>
        </motion.button>

        {/* Female Choice */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('female')}
          className="relative group overflow-hidden rounded-2xl border border-blue-border bg-gradient-to-b from-blue-card to-deep-blue p-6 flex flex-col items-center justify-center gap-3.5 shadow-lg transition-all hover:border-sky-400/40"
        >
          <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform duration-300 border border-sky-500/20">
            <span className="text-xl font-serif font-bold">♀</span>
          </div>
          <span className="text-sm font-serif tracking-widest text-[#e2e2e7] group-hover:text-sky-300 transition-colors">
            女士
          </span>
          <span className="text-[9px] uppercase tracking-widest text-slate-400 font-serif">LADY</span>
        </motion.button>
      </div>

      <div className="flex flex-col items-center gap-1 mt-2 select-none pointer-events-none">
        <span className="text-[10px] text-sky-400/50 font-serif tracking-widest uppercase font-bold animate-pulse">
          ✦ 该应用只娱乐使用 ✦
        </span>
        <span className="text-[7px] text-[#e2e2e7]/20 font-sans tracking-[0.2em] uppercase">
          ✧ STAR DESTINY v1.0 ✧
        </span>
      </div>
    </motion.div>

  );
}

