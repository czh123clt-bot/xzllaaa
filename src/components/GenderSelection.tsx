import React from 'react';
import { motion } from 'motion/react';

interface GenderSelectionProps {
  key?: React.Key;
  onSelect: (gender: 'male' | 'female') => void;
}

export default function GenderSelection({ onSelect }: GenderSelectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto h-full w-full select-none"
    >
      {/* Decorative Mystical Accent */}
      <div className="mb-8 flex items-center justify-center gap-1.5 text-zinc-400">
        <span className="text-sm tracking-widest font-serif font-bold">✦</span>
        <div className="w-12 h-[1px] bg-zinc-200" />
        <span className="text-sm tracking-widest font-serif font-bold">☾</span>
        <div className="w-12 h-[1px] bg-zinc-200" />
        <span className="text-sm tracking-widest font-serif font-bold">✦</span>
      </div>

      <h1 className="text-3xl font-serif tracking-[0.25em] text-zinc-950 mb-3 font-medium uppercase">
        寻找幸运牌
      </h1>
      <div className="flex flex-col items-center gap-2 mb-10">
        <p className="text-zinc-600 font-serif text-xs max-w-xs leading-relaxed tracking-wider">
          “听从命运的召唤，探知你命运长河中的守护王牌”
        </p>
      </div>

      {/* Selector Grid */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-xs mb-8">
        {/* Male Choice */}
        <motion.button
          whileHover={{ scale: 1.02, borderColor: '#18181b' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('male')}
          className="relative group rounded-xl border border-zinc-200 bg-white p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-800 border border-zinc-200 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300">
            <span className="text-lg font-serif">♂</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-serif tracking-widest text-zinc-900">
              男士
            </span>
            <span className="text-[8px] uppercase tracking-widest text-zinc-450 font-serif text-zinc-400">GENTLEMAN</span>
          </div>
        </motion.button>

        {/* Female Choice */}
        <motion.button
          whileHover={{ scale: 1.02, borderColor: '#18181b' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('female')}
          className="relative group rounded-xl border border-zinc-200 bg-white p-6 flex flex-col items-center justify-center gap-4 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-800 border border-zinc-200 group-hover:bg-zinc-950 group-hover:text-white transition-colors duration-300">
            <span className="text-lg font-serif">♀</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-serif tracking-widest text-zinc-900">
              女士
            </span>
            <span className="text-[8px] uppercase tracking-widest text-zinc-450 font-serif text-zinc-400">LADY</span>
          </div>
        </motion.button>
      </div>

      <div className="flex flex-col items-center gap-1.5 mt-2 select-none pointer-events-none">
        {/* Footnotes removed as requested */}
      </div>
    </motion.div>
  );
}

