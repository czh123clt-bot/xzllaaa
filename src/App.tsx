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
    setState(prev => ({ ...prev, gender }));
    requestSensorPermissionEarly();
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
    <div className="relative h-screen w-screen bg-white text-zinc-900 selection:bg-zinc-100 selection:text-zinc-900 overflow-hidden font-sans flex flex-col justify-between">
      {/* CONSTANT MINIMAL MYSTIC AMBIENT BACKGROUND - LIGHT SILVER ACCENTS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-25">
        {/* Soft magical/silver/gray wash */}
        <div className="absolute top-[-20%] left-[10%] w-[140%] h-[80%] rounded-full bg-zinc-100/40 blur-[180px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[120%] h-[60%] rounded-full bg-zinc-50/50 blur-[180px]" />
        
        {/* Custom micro spark stars in soft gray */}
        <div className="absolute top-[15%] left-[10%] opacity-25"><Sparkle className="w-1 text-zinc-400 h-1" /></div>
        <div className="absolute top-[30%] right-[18%] opacity-20"><Sparkles className="w-1.5 text-zinc-400 h-1.5" /></div>
        <div className="absolute bottom-[25%] left-[15%] opacity-25"><Sparkle className="w-1.2 text-zinc-400 h-1.2" /></div>
        <div className="absolute top-[68%] left-[62%] opacity-15"><Sparkle className="w-1 text-zinc-300 h-1" /></div>
        <div className="absolute top-[82%] right-[25%] opacity-25"><Sparkle className="w-1 text-zinc-400 h-1" /></div>
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
    </div>
  );
}

