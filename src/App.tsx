/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AppState, ZodiacInfo } from './types';
import GenderSelection from './components/GenderSelection';
import ZodiacSelection from './components/ZodiacSelection';
import CardTrickScreen from './components/CardTrickScreen';
import { Sparkle, Sparkles, Compass } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>({
    gender: null,
    selectedZodiac: null,
    history: [],
  });
  
  // Pending gender for custom permission explanation modal
  const [permissionTargetGender, setPermissionTargetGender] = useState<'male' | 'female' | null>(null);

  const requestSensorPermissionEarly = async () => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      const DeviceOrientation = DeviceOrientationEvent as any;
      if (typeof DeviceOrientation.requestPermission === 'function') {
        try {
          await DeviceOrientation.requestPermission();
        } catch (e) {
          console.warn('Silent early permission request:', e);
        }
      }
    }
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setPermissionTargetGender(gender);
  };

  const handleZodiacSelect = (selectedZodiac: ZodiacInfo) => {
    setState(prev => ({ ...prev, selectedZodiac }));
    requestSensorPermissionEarly();
  };

  const handleBackToGender = () => {
    setState(prev => ({ ...prev, gender: null, selectedZodiac: null }));
  };

  const handleBackToZodiac = () => {
    setState(prev => ({ ...prev, selectedZodiac: null }));
  };

  return (
    <div className="relative h-screen w-screen bg-deep-blue text-white selection:bg-blue-accent/30 selection:text-blue-accent overflow-hidden font-sans flex flex-col justify-between">
      {/* CONSTANT COSMIC AMBIENT STARFIELD IN BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-40">
        {/* Soft magical glow */}
        <div className="absolute top-[-10%] left-[20%] w-[130%] h-[60%] rounded-full bg-blue-900/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[100%] h-[50%] rounded-full bg-sky-950/20 blur-[130px]" />
        
        {/* Custom micro spark stars with elegant glow */}
        <div className="absolute top-[12%] left-[8%] animate-pulse"><Sparkle className="w-1 text-sky-400 h-1" /></div>
        <div className="absolute top-[28%] right-[15%] animate-pulse delay-75"><Sparkles className="w-1.5 text-blue-300/40 h-1.5" /></div>
        <div className="absolute bottom-[20%] left-[12%] animate-pulse delay-500"><Sparkle className="w-1.2 text-sky-300/30 h-1.2" /></div>
        <div className="absolute top-[65%] left-[64%] animate-pulse delay-1000"><Sparkle className="w-1 text-slate-500 h-1" /></div>
        <div className="absolute top-[85%] right-[22%] animate-pulse delay-300"><Sparkle className="w-1 text-slate-500 h-1" /></div>
      </div>

      {/* VIEW STAGES */}
      <main className="relative z-10 w-full h-full overflow-hidden flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!state.gender ? (
            <GenderSelection key="gender" onSelect={handleGenderSelect} />
          ) : !state.selectedZodiac ? (
            <ZodiacSelection
              key="zodiac"
              gender={state.gender}
              onSelect={handleZodiacSelect}
              onBack={handleBackToGender}
            />
          ) : (
            <CardTrickScreen
              key="trick"
              gender={state.gender}
              zodiac={state.selectedZodiac}
              onBack={handleBackToZodiac}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Interactive Permission explanation modal */}
      <AnimatePresence>
        {permissionTargetGender && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/92 p-5 select-none"
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              className="w-full max-w-sm rounded-2xl border border-blue-border bg-gradient-to-b from-blue-card to-[#0b1528] p-6 shadow-2xl relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full border border-blue-border bg-blue-card flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(56,189,248,0.15)] select-none">
                  <Compass className="w-6 h-6 text-sky-400 animate-pulse" />
                </div>

                <span className="text-[#38bdf8] text-[9px] uppercase tracking-[0.25em] font-serif mb-1.5 font-bold">
                  CELESTIAL ENTERTAINMENT
                </span>
                
                <h2 className="text-base font-serif font-semibold text-white tracking-widest mb-6 px-2">
                  该应用只娱乐使用
                </h2>

                <div className="flex flex-col gap-2.5 w-full">
                  <button
                    onClick={async () => {
                      // Trigger iOS sensor permission inside user tap
                      await requestSensorPermissionEarly();
                      // Transition to Zodiac screen
                      setState(prev => ({ ...prev, gender: permissionTargetGender }));
                      setPermissionTargetGender(null);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-bold font-serif tracking-[0.2em] text-[#08070b] bg-white shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer uppercase text-center"
                  >
                    确定开启
                  </button>
                  <button
                    onClick={() => {
                      setPermissionTargetGender(null);
                    }}
                    className="w-full py-2.5 rounded-xl text-[10px] font-serif tracking-[0.2em] text-[#e2e2e7]/65 border border-blue-border hover:text-white hover:border-sky-400/55 transition-all cursor-pointer uppercase text-center"
                  >
                    取消 CANCEL
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

