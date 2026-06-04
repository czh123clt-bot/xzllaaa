/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppState, ZodiacInfo } from './types';
import GenderSelection from './components/GenderSelection';
import ZodiacSelection from './components/ZodiacSelection';
import CardTrickScreen from './components/CardTrickScreen';
import { Sparkle, Sparkles } from 'lucide-react';

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
    </div>
  );
}

