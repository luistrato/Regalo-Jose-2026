import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClueState, GamePhase, QuoteModalData } from './types';
import { HeaderBar } from './components/HeaderBar';
import { MasterConsole } from './components/MasterConsole';
import { Sector7GPanel } from './components/Sector7GPanel';
import { VandelayDeskPanel } from './components/VandelayDeskPanel';
import { FlightRadarPanel } from './components/FlightRadarPanel';
import { HumorModal } from './components/HumorModal';
import { FlightSimulatorRevealModal } from './components/FlightSimulatorRevealModal';
import { FinalRevealModal } from './components/FinalRevealModal';
import { HintsModal } from './components/HintsModal';
import { getRandomQuote } from './data/quotes';
import { playClickSound, playKeyUnlockSound } from './utils/audio';
import { Coffee, StickyNote, Radio, Sparkles, Plane, ArrowRight, ShieldCheck, CornerDownRight } from 'lucide-react';

export default function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('phase1_office');
  const [clues, setClues] = useState<ClueState>({
    nuclearKey: false,
    vandelayKey: false,
    radarKey: false,
  });

  const [quoteModal, setQuoteModal] = useState<QuoteModalData>({
    isOpen: false,
    character: 'Homer',
    quote: '',
    source: 'Los Simpson (España)',
    emoji: '🍩',
  });

  const [isFlightSimModalOpen, setIsFlightSimModalOpen] = useState(false);
  const [isFinalRevealOpen, setIsFinalRevealOpen] = useState(false);
  const [isHintsOpen, setIsHintsOpen] = useState(false);
  const [deskNoteCount, setDeskNoteCount] = useState(0);

  const showQuote = (quoteData: Omit<QuoteModalData, 'isOpen'>) => {
    setQuoteModal({
      isOpen: true,
      ...quoteData,
    });
  };

  const handleUnlockKey = (keyName: keyof ClueState) => {
    setClues((prev) => {
      const updated = { ...prev, [keyName]: true };
      return updated;
    });

    if (keyName === 'radarKey') {
      setTimeout(() => {
        setIsFinalRevealOpen(true);
      }, 700);
    }
  };

  const handleMasterOfficeActivate = () => {
    setIsFlightSimModalOpen(true);
  };

  const handleContinueToRadarPhase = () => {
    setIsFlightSimModalOpen(false);
    setGamePhase('phase2_radar');
  };

  const handleRestart = () => {
    setClues({
      nuclearKey: false,
      vandelayKey: false,
      radarKey: false,
    });
    setGamePhase('phase1_office');
    setIsFlightSimModalOpen(false);
    setIsFinalRevealOpen(false);
  };

  const handleRandomEasterEgg = () => {
    playClickSound();
    const randomQuote = getRandomQuote();
    showQuote(randomQuote);
  };

  const handleStickyNoteClick = () => {
    playClickSound();
    const count = deskNoteCount + 1;
    setDeskNoteCount(count);
    if (count % 2 === 1) {
      showQuote({
        character: 'Homer',
        quote: 'Nota mental: No pulsar botones rojos si no hay rosquillas cerca.',
        source: 'Los Simpson (España)',
        emoji: '📝',
        soundType: 'homer',
      });
    } else {
      showQuote({
        character: 'George',
        quote: 'Recordatorio para Art Vandelay: Nunca confíes en un cliente que no aprecie el buen látex.',
        source: 'Seinfeld',
        emoji: '📌',
        soundType: 'click',
      });
    }
  };

  const handleCoffeeMugClick = () => {
    playClickSound();
    showQuote({
      character: 'Homer',
      quote: '¡Café de la central! Sabe un 30% a uranio y un 70% a sueños rotos.',
      source: 'Los Simpson (España)',
      emoji: '☕',
      soundType: 'homer',
    });
  };

  const phase1Complete = clues.nuclearKey && clues.vandelayKey;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-amber-500 selection:text-black flex flex-col justify-between relative overflow-x-hidden">
      {/* Background Subtle Grid Effect */}
      <div className="fixed inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

      {/* Top Header Bar */}
      <HeaderBar
        clues={clues}
        gamePhase={gamePhase}
        onOpenHints={() => setIsHintsOpen(true)}
        onMasterActivate={handleMasterOfficeActivate}
        onSwitchPhase={(phase) => setGamePhase(phase)}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6 flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {gamePhase === 'phase1_office' ? (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Mission briefing banner */}
              <section
                id="escape-room-mission-briefing"
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 shadow-lg relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                        MISIÓN 1: DESPACHOS DE HOMER SIMPSON & ART VANDELAY
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-extrabold text-white font-mono">
                      Consigue las 2 Llaves de Autorización de la Oficina
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                      Investiga los paneles del <strong>Sector 7G de Springfield</strong> y el escritorio de <strong>Vandelay Industries</strong>. Resuelve los acertijos, interactúa con los objetos y valida las combinaciones para desbloquear la recompensa.
                    </p>
                  </div>

                  {/* Interactive Props / Easter Eggs */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      id="easter-egg-coffee-mug"
                      onClick={handleCoffeeMugClick}
                      className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-700 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                      title="Taza de café sospechosa"
                    >
                      <Coffee className="w-4 h-4 text-amber-400" />
                      <span>Café 7G</span>
                    </button>

                    <button
                      id="easter-egg-sticky-note"
                      onClick={handleStickyNoteClick}
                      className="p-2.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 rounded-xl font-bold text-xs font-mono flex items-center gap-1.5 shadow-md transition active:scale-95 cursor-pointer"
                      title="Post-it de la oficina"
                    >
                      <StickyNote className="w-4 h-4" />
                      <span>Post-it</span>
                    </button>

                    <button
                      id="random-intercom-quote-btn"
                      onClick={handleRandomEasterEgg}
                      className="p-2.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl border border-zinc-700 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                      title="Intercomunicador de oficina"
                    >
                      <Radio className="w-4 h-4 text-cyan-400" />
                      <span className="hidden sm:inline">Intercom</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Master Activation Console (Phase 1) */}
              <MasterConsole
                clues={clues}
                onMasterActivate={handleMasterOfficeActivate}
              />

              {/* 2 Puzzle Modules: Sector 7G + Vandelay */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Module 1: Homer's Nuclear Sector 7G */}
                <div className="flex flex-col">
                  <Sector7GPanel
                    isUnlocked={clues.nuclearKey}
                    onUnlockKey={() => handleUnlockKey('nuclearKey')}
                    onShowQuote={showQuote}
                  />
                </div>

                {/* Module 2: George Costanza's Vandelay Office */}
                <div className="flex flex-col">
                  <VandelayDeskPanel
                    isUnlocked={clues.vandelayKey}
                    onUnlockKey={() => handleUnlockKey('vandelayKey')}
                    onShowQuote={showQuote}
                  />
                </div>
              </section>

              {/* Ready banner when 2 keys are unlocked */}
              {phase1Complete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-amber-950/60 border-2 border-amber-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
                >
                  <div className="flex items-center gap-3 text-center sm:text-left">
                    <div className="p-3 bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/40">
                      <Sparkles className="w-6 h-6 animate-spin" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-amber-300 font-mono">
                        ¡LLAVES 1 Y 2 OBTENIDAS CON ÉXITO!
                      </div>
                      <div className="text-xs text-zinc-300">
                        El sistema de autorización está listo. Pulsa el botón para revelar el regalo.
                      </div>
                    </div>
                  </div>

                  <button
                    id="trigger-flight-gift-btn"
                    onClick={handleMasterOfficeActivate}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-mono font-bold text-sm rounded-xl transition shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>🎁 Desvelar Regalo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Suspenseful Radar Briefing Banner */}
              <section
                id="radar-briefing-banner"
                className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-zinc-900 to-black border-2 border-emerald-500/60 shadow-xl relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <Plane className="w-4 h-4" /> PRUEBA FINAL • VECTOR DE NAVEGACIÓN AÉREA
                      </span>
                    </div>
                    <h2 className="text-lg md:text-xl font-extrabold text-white font-mono">
                      Interferencia en la Torre de Control: Configura la Aproximación
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
                      Se ha detectado un plan de vuelo clasificado. Para descubrir la última y mayor sorpresa, debes sincronizar las coordenadas aéreas: selecciona el <strong>aeropuerto destino</strong>, sintoniza la <strong>frecuencia VHF</strong> y alinea la <strong>pista instrumental</strong>.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      id="view-first-gift-again-btn"
                      onClick={() => setIsFlightSimModalOpen(true)}
                      className="px-3.5 py-2 bg-zinc-800/90 hover:bg-zinc-700 text-cyan-300 rounded-xl border border-zinc-700 text-xs font-mono transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>🎮 Ver Regalo #1</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Flight Radar Panel */}
              <FlightRadarPanel
                isUnlocked={clues.radarKey}
                onUnlockKey={() => handleUnlockKey('radarKey')}
                onShowQuote={showQuote}
                onOpenFinalModal={() => setIsFinalRevealOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-4 border-t border-zinc-800/80 bg-zinc-950/80 text-center text-xs font-mono text-zinc-500 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Sector 7G Springfield × Vandelay Industries • Operación Especial</span>
          <span>Inspirado en Los Simpson (España) & Seinfeld</span>
        </div>
      </footer>

      {/* Humor & Dialog Modal */}
      <HumorModal
        data={quoteModal}
        onClose={() => setQuoteModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Hints Modal */}
      <HintsModal
        isOpen={isHintsOpen}
        onClose={() => setIsHintsOpen(false)}
        gamePhase={gamePhase}
      />

      {/* FIRST GIFT REVEAL: Microsoft Flight Simulator 2024 */}
      <FlightSimulatorRevealModal
        isOpen={isFlightSimModalOpen}
        onContinueToRadar={handleContinueToRadarPhase}
      />

      {/* FINAL GIFT REVEAL: Trip to Málaga "A todo trapo" */}
      <FinalRevealModal
        isOpen={isFinalRevealOpen}
        onRestart={handleRestart}
      />
    </div>
  );
}
