import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, RotateCcw, Sparkles, Compass, Sparkle, Eye
} from 'lucide-react';
import { Card, ZodiacInfo } from '../types';
import { generateTrickCards, getSuitSymbol, getSuitName } from '../utils/cardUtils';
import { playChimeSound, playTickSound } from '../utils/audio';

interface CardTrickScreenProps {
  key?: React.Key;
  gender: 'male' | 'female';
  zodiac: ZodiacInfo;
  onBack: () => void;
}

export default function CardTrickScreen({ gender, zodiac, onBack }: CardTrickScreenProps) {
  // --- Game State ---
  const [cards, setCards] = useState<Card[]>([]);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [hasTriggeredTrick, setHasTriggeredTrick] = useState<boolean>(false);
  const [soundEnabled] = useState<boolean>(true);

  // --- Face-down / Sensor State ---
  const [isPhysicallyFaceDown, setIsPhysicallyFaceDown] = useState<boolean>(false);
  // Hidden support for desktop testing: click the constellation title to simulate flip
  const [isSimulatedFaceDown, setIsSimulatedFaceDown] = useState<boolean>(false);
  
  const [sensorStatus, setSensorStatus] = useState<'unsupported' | 'checking' | 'active' | 'denied'>('checking');
  const [isLockedBySpectator, setIsLockedBySpectator] = useState<boolean>(false);
  const [spectatorSelectedIndex, setSpectatorSelectedIndex] = useState<number | null>(null);

  // Hidden admin debug grimoire (toggled by triple-clicking "尘埃初定" or title)
  const [showMagicianPanel, setShowMagicianPanel] = useState<boolean>(false);
  const [secretLogs, setSecretLogs] = useState<string[]>(['✨ 灵场磁极对准完毕...']);

  // Initializing deck
  useEffect(() => {
    resetDeck();
  }, [zodiac]);

  const logSecret = (msg: string) => {
    setSecretLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 5)]);
  };

  const resetDeck = () => {
    const initializedCards = generateTrickCards(zodiac);
    setCards(initializedCards);
    setSelectedCard(null);
    setHasTriggeredTrick(false);
    setIsLockedBySpectator(false);
    setSpectatorSelectedIndex(null);
    logSecret(`首牌绑定为: ${getSuitName(zodiac.firstCard.suit)}${zodiac.firstCard.value}，转运强选牌: ${getSuitName(zodiac.forcedCard.suit)}${zodiac.forcedCard.value}`);
  };

  // Modern blue-gray card suit colors
  const getElegantCardSuitColor = (suit: string) => {
    return suit === 'H' || suit === 'D' ? 'text-[#e11d48]' : 'text-[#0f172a]';
  };

  // --- iOS Sensor Permission Requester ---
  const requestSensorPermission = async () => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      const requestPermission = (DeviceOrientationEvent as any).requestPermission;
      if (typeof requestPermission === 'function') {
        try {
          const state = await requestPermission();
          if (state === 'granted') {
            setSensorStatus('active');
            logSecret('📡 陀螺仪已成功授权');
          } else {
            setSensorStatus('denied');
          }
        } catch (e) {
          setSensorStatus('denied');
        }
      } else {
        setSensorStatus('active');
      }
    } else {
      setSensorStatus('unsupported');
    }
  };

  // --- Real Physical Orientation Listener ---
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceOrientationEvent' in window) {
      setSensorStatus('active');

      const handleOrientation = (event: DeviceOrientationEvent) => {
        const beta = event.beta; // Pitch / Tilt [-180, 180]
        if (beta !== null) {
          // Absolute pitch > 140 means phone flipped face-down on table
          const faceDown = Math.abs(beta) > 135;
          setIsPhysicallyFaceDown(prev => {
            if (prev !== faceDown) {
              logSecret(faceDown ? '📡 重力感应：星阵面朝下方' : '📡 重力感应：恢复面朝上');
            }
            return faceDown;
          });
        }
      };

      window.addEventListener('deviceorientation', handleOrientation);
      return () => {
        window.removeEventListener('deviceorientation', handleOrientation);
      };
    } else {
      setSensorStatus('unsupported');
    }
  }, []);

  // Request permission on any user touch/interaction with this screen
  const handleInteractionInit = () => {
    requestSensorPermission();
  };

  const isFaceDownActive = isPhysicallyFaceDown || isSimulatedFaceDown;

  // --- Spectator Blind Touch Action ---
  const handleFaceDownScreenTap = () => {
    if (isLockedBySpectator) return;
    if (soundEnabled) playTickSound();

    // Forced replacement match index
    const forcedCardIdx = cards.findIndex(
      c => c.suit === zodiac.forcedCard.suit && c.value === zodiac.forcedCard.value
    );

    let chosenIdx = forcedCardIdx !== -1 ? forcedCardIdx : 0;

    if (hasTriggeredTrick) {
      // Repeat checks safeguards
      chosenIdx = Math.floor(Math.random() * 9);
      logSecret(`防重复保障: 分配随机牌 [${chosenIdx + 1}]`);
    } else {
      setHasTriggeredTrick(true);
      logSecret(`首次盲选: 已锁定转运本命牌 [${chosenIdx + 1}]: ${getSuitName(cards[chosenIdx].suit)}${cards[chosenIdx].value}`);
    }

    setSpectatorSelectedIndex(chosenIdx);
    setIsLockedBySpectator(true);
  };

  // Monitor physical alignment
  useEffect(() => {
    if (!isFaceDownActive && isLockedBySpectator && spectatorSelectedIndex !== null) {
      const card = cards[spectatorSelectedIndex];
      if (card) {
        if (soundEnabled) playChimeSound();
        setSelectedCard(card);
        logSecret(`命定重现: 契约牌放大揭晓 -> ${getSuitName(card.suit)}${card.value}`);
      }
    }
  }, [isFaceDownActive, isLockedBySpectator, spectatorSelectedIndex, cards]);

  const handleNormalCardClick = (card: Card, index: number) => {
    if (soundEnabled) playChimeSound();
    setSelectedCard(card);
    logSecret(`点击校对牌 [${index + 1}]: ${getSuitName(card.suit)}${card.value}`);
  };

  return (
    <div 
      onClick={handleInteractionInit}
      onTouchStart={handleInteractionInit}
      className="flex flex-col w-full max-w-md mx-auto px-4 py-3 h-full justify-between relative overflow-hidden select-none bgs-viewport"
    >
      {/* HEADER SECTION --- Fully polished and clean */}
      <div className="flex items-center justify-between py-1 select-none">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-blue-border bg-blue-card/60 text-[#e2e2e7]/80 text-[10px] font-serif tracking-widest hover:text-white hover:border-sky-400 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-sky-400" />
          返回 BACK
        </button>

        {/* Constellation Indicator - Plain and Elegantly Centered static view */}
        <div className="flex flex-col items-center">
          <h3 className="text-xs font-serif tracking-widest text-[#f8fafc] flex items-center gap-1">
            <span>{zodiac.name}</span>
            <span className="text-[8px] text-sky-300 font-normal px-1.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-400/20">
              {gender === 'male' ? '男 ♂' : '女 ♀'}
            </span>
          </h3>
          <span className="text-[7px] font-serif text-sky-300/40 tracking-[0.2em] mt-0.5">STAR SIGN COGNITION</span>
        </div>

        {/* Right empty placeholder balance (No icons/wrench/volume per request) */}
        <div className="w-[68px]" />
      </div>

      {/* RITUAL STATUS HEADER */}
      <div className="flex items-center justify-center py-2 border-b border-dashed border-blue-border/30 select-none font-serif">
        <span className="text-[10px] text-sky-300/80 flex items-center gap-1.5 tracking-widest uppercase">
          <Sparkle className="w-3.5 h-3.5 text-sky-300 animate-pulse" />
          九曜星宿 · 本命星阵
        </span>
      </div>

      {/* 3x3 CARDS MATRIX - ELEGANT DEEP NAVY / SILVER DESIGN */}
      <div className="relative flex-1 my-3 bg-gradient-to-b from-[#0f1d3c] to-[#070d1e] p-3 border border-blue-border rounded-xl shadow-2xl grid grid-cols-3 gap-2.5 items-center justify-items-center select-none w-full max-w-sm mx-auto overflow-hidden">
        
        {/* Sky constellations subtle blueprint */}
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none select-none">
          <Compass className="w-52 h-52 text-white animate-[spin_100s_linear_infinite]" />
        </div>

        {cards.map((card, idx) => {
          const suitSym = getSuitSymbol(card.suit);
          const elegantColor = getElegantCardSuitColor(card.suit);

          return (
            <motion.button
              key={card.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleNormalCardClick(card, idx)}
              className="aspect-[2/3] w-full rounded-xl bg-white shadow-[0_4px_12px_rgba(0,0,0,0.15)] flex flex-col justify-between p-2.5 relative select-none cursor-pointer overflow-hidden group border border-[#e2e8f0]"
            >
              {/* Corner Value Label (Top-Left) */}
              <div className="flex flex-col items-start leading-none">
                <span className={`text-[15px] font-sans font-black tracking-tighter ${elegantColor}`}>
                  {card.value}
                </span>
                <span className={`text-[11px] ${elegantColor} leading-none mt-0.5`}>
                  {suitSym}
                </span>
              </div>

              {/* Center Giant Suit representation */}
              <div className={`text-center flex justify-center items-center ${elegantColor} select-none group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-3xl select-none filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                  {suitSym}
                </span>
              </div>

              {/* Corner Value Label (Bottom-Right, Flipped) */}
              <div className="flex flex-col items-end leading-none rotate-180">
                <span className={`text-[15px] font-sans font-black tracking-tighter ${elegantColor}`}>
                  {card.value}
                </span>
                <span className={`text-[11px] ${elegantColor} leading-none mt-0.5`}>
                  {suitSym}
                </span>
              </div>

              {/* Subtle elegant inner thin border line to feel like absolute authentic playing cards */}
              <div className="absolute inset-1.5 border border-[#0f172a]/5 rounded-lg pointer-events-none" />

              {/* Ultra faint silver glossy reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            </motion.button>
          );
        })}
      </div>

      {/* --- LEVEL 1: MAGICAL FACE-DOWN BLACK SCREEN --- */}
      <AnimatePresence>
        {isFaceDownActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFaceDownScreenTap}
            className="fixed inset-0 bg-black z-50 flex flex-col justify-between items-center p-6 select-none text-center cursor-pointer"
          >
            {/* Hidden debug escape button */}
            <div className="w-full flex justify-end">
              {isSimulatedFaceDown && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSimulatedFaceDown(false);
                  }}
                  className="px-2.5 py-1 rounded bg-blue-card border border-blue-border text-white text-[9px] font-serif tracking-wider hover:bg-blue-card/80 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  朝上还原
                </button>
              )}
            </div>

            {/* Orbit Core portal */}
            <div className="flex flex-col items-center justify-center my-auto gap-5">
              <motion.div
                animate={{ 
                  scale: [1, 1.03, 1],
                  rotate: 360 
                }}
                transition={{ 
                  scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 60, repeat: Infinity, ease: 'linear' }
                }}
                className="w-28 h-28 rounded-full border border-blue-border border-t-white/30 relative flex items-center justify-center bg-[#090e1a]/40 shadow-[0_0_30px_rgba(56,189,248,0.05)]"
              >
                <div className="absolute inset-2.5 rounded-full border border-dashed border-blue-border/20 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white/20 animate-pulse" />
                </div>
              </motion.div>

              <div className="space-y-2 max-w-xs">
                {!isLockedBySpectator ? (
                  <>
                    <h2 className="text-sm font-serif tracking-[0.2em] text-[#f8fafc] uppercase">
                      ✧ 混沌星盘已盖 ✧
                    </h2>
                    <p className="text-[10px] text-[#e2e2e7]/70 leading-relaxed font-serif px-2">
                      星轴进入静默轨迹。<br />请观众指间凝聚灵光，在漆黑上<strong>任意按着一下</strong>锁定直觉。
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-sm font-serif tracking-[0.2em] text-cyan-300 uppercase animate-pulse">
                      ✧ 灵能契约结成 ✧
                    </h2>
                    <p className="text-[10px] text-[#e2e2e7]/85 leading-relaxed font-serif px-2">
                      转运光斑已点亮对应牌宫。<br />现在请将手机<strong>拿到面前翻转朝上</strong>吧。
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Faint footer */}
            <div className="text-[7px] text-[#e2e2e7]/20 font-serif tracking-[0.3em] uppercase">
              REVOLUTION GYRO SENSOR ACTIVE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LEVEL 2: CLEAN RESULT REVEAL MODAL (No Gold, Deep space theme) --- */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setSelectedCard(null);
              setIsLockedBySpectator(false);
              setSpectatorSelectedIndex(null);
            }}
            className="fixed inset-0 bg-[#060b17]/95 z-40 flex flex-col justify-center items-center p-6 select-none cursor-pointer text-center"
          >
            {/* Elegant deep celestial light effect */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-500/10 blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

            <motion.div
              initial={{ scale: 0.6, rotateY: 90 }}
              animate={{ scale: 1, rotateY: 0 }}
              exit={{ scale: 0.6, rotateY: 90 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              onClick={(e) => e.stopPropagation()} 
              className="w-full max-w-[190px] aspect-[2/3] rounded-xl bg-white border-2 border-blue-border shadow-[0_0_35px_rgba(56,189,248,0.2)] flex flex-col justify-between p-4 relative cursor-default"
            >
              {/* Fine subtle blueprint dotted inside margin */}
              <div className="absolute inset-1 border border-dashed border-blue-border/15 rounded-lg pointer-events-none" />

              {/* Card values top left */}
              <div className="flex flex-col items-start leading-none pointer-events-none">
                <span className={`text-xl font-serif font-black tracking-tighter ${getElegantCardSuitColor(selectedCard.suit)}`}>
                  {selectedCard.value}
                </span>
                <span className={`text-base font-serif leading-none mt-0.5 ${getElegantCardSuitColor(selectedCard.suit)}`}>
                  {getSuitSymbol(selectedCard.suit)}
                </span>
              </div>

              {/* Giant Symbol centered */}
              <div className="flex justify-center items-center flex-1 pointer-events-none">
                <span className={`text-6xl select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)] ${getElegantCardSuitColor(selectedCard.suit)}`}>
                  {getSuitSymbol(selectedCard.suit)}
                </span>
              </div>

              {/* Card values bottom right flipped */}
              <div className="flex flex-col items-end rotate-180 leading-none pointer-events-none">
                <span className={`text-xl font-serif font-black tracking-tighter ${getElegantCardSuitColor(selectedCard.suit)}`}>
                  {selectedCard.value}
                </span>
                <span className={`text-base font-serif leading-none mt-0.5 ${getElegantCardSuitColor(selectedCard.suit)}`}>
                  {getSuitSymbol(selectedCard.suit)}
                </span>
              </div>
            </motion.div>

            {/* Magician Narrative Result details */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 max-w-xs select-none"
            >
              <h3 className="text-base font-serif text-white tracking-widest uppercase">
                {getSuitName(selectedCard.suit)}{selectedCard.value}
              </h3>
              
              <div className="mt-2.5 px-4 py-3 rounded-lg bg-blue-card/60 border border-blue-border max-w-xs mx-auto">
                <p className="text-[10px] text-[#e2e2e7]/80 leading-relaxed font-sans text-left">
                  {selectedCard.suit === zodiac.forcedCard.suit && selectedCard.value === zodiac.forcedCard.value ? (
                    <span>
                      🌌 <strong>星宿契合！</strong> 在这玄妙静默的盲点宿命中，你探出的微尘之触，竟然正指向了代表本命轨迹的专属时空牌（{getSuitName(zodiac.forcedCard.suit)}{zodiac.forcedCard.value}）。星空流转，愿福运永随。
                    </span>
                  ) : (
                    <span>
                      🍃 <strong>星宿变幻：</strong> 你探知到了星轨中的流动变数。这全然证明了阵局星宿毫无干系，每次纯凭直觉，具有十足的机缘概率。
                    </span>
                  )}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setSelectedCard(null);
                  setIsLockedBySpectator(false);
                  setSpectatorSelectedIndex(null);
                }}
                className="mt-4 px-6 py-2 rounded-full text-[10px] font-bold font-serif tracking-[0.2em] text-[#08070b] bg-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase"
              >
                好的 OK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HIDDEN SECRET DIAL - Toggleable secretly by double tapping bottom banner/status text */}
      {showMagicianPanel && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-card border border-blue-border rounded-xl p-3 shadow-2xl relative select-none font-sans text-[10px] mt-2"
        >
          <div className="absolute top-2 right-3 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="text-[7px] font-bold text-sky-300 tracking-widest">DEVELOPER RITUAL</span>
          </div>

          <h4 className="text-[10px] font-serif font-bold text-sky-300 mb-1 flex items-center gap-1 border-b border-blue-border/40 pb-1 uppercase">
            逆天盘秘籍 / SECRETS
          </h4>

          <div className="grid grid-cols-2 gap-2 text-[8px] font-mono text-[#e2e2e7]/70">
            <div>
              <p>• 宿命指定牌: <strong className="text-white">{getSuitName(zodiac.forcedCard.suit)}{zodiac.forcedCard.value}</strong></p>
              <p>• 陀螺仪授权: <strong className="text-white uppercase">{sensorStatus}</strong></p>
            </div>
            <div>
              <p>• 物理反扣: <strong className="text-white">{isPhysicallyFaceDown ? '已朝下' : '朝上'}</strong></p>
              <p>• 暗选指向: <strong className="text-white">{spectatorSelectedIndex !== null ? `位置[${spectatorSelectedIndex + 1}]` : '未选'}</strong></p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Minimalistic Star footer badge */}
      <div className="text-[7px] text-[#e2e2e7]/30 font-serif tracking-[0.2em] uppercase text-center py-1 select-none">
        ✧ CELESTIAL ALIGNMENT TAROT ✧
      </div>
    </div>
  );
}
