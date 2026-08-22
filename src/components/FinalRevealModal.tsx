import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Plane, Sparkles, Trophy, Calendar, MapPin, Gamepad2, Volume2, RotateCcw, Flame, CheckCircle2 } from 'lucide-react';
import { playEpicFanfare, playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onRestart: () => void;
}

export const FinalRevealModal: React.FC<Props> = ({ isOpen, onRestart }) => {
  useEffect(() => {
    if (isOpen) {
      playEpicFanfare();
      triggerGrandConfetti();
    }
  }, [isOpen]);

  const triggerGrandConfetti = () => {
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6', '#eab308'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#f59e0b', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6', '#eab308'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="final-reveal-modal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
      >
        <motion.div
          id="final-reveal-content-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="relative w-full max-w-4xl bg-gradient-to-b from-zinc-900 via-slate-900 to-zinc-950 border-2 border-amber-400 rounded-3xl p-6 md:p-10 shadow-2xl shadow-amber-500/20 text-white my-auto overflow-hidden"
        >
          {/* Background decorative glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Epic Header */}
          <div className="text-center mb-8 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              ¡MISIÓN COMPLETA • TODOS LOS REGALOS DESVELADOS!
            </motion.div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-100 font-serif">
              ¡FELICIDADES, BRO! 🎉
            </h1>
            <p className="text-zinc-300 text-sm md:text-base mt-2 max-w-xl mx-auto">
              Has descifrado todas las pruebas del Sector 7G, las oficinas de Vandelay y el Radar de Navegación Aérea:
            </p>
          </div>

          {/* TWO MAIN GIFTS DISPLAY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* GIFT 1: MICROSOFT FLIGHT SIMULATOR 2024 */}
            <motion.div
              id="gift-card-flight-simulator"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="group relative rounded-2xl p-6 bg-gradient-to-br from-slate-900 to-blue-950/80 border-2 border-cyan-400/80 shadow-xl shadow-cyan-500/10 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold rounded-bl-xl border-b border-l border-cyan-500/40 uppercase flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5" /> Steam Library
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-cyan-500 text-slate-950 rounded-xl shadow-md">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                      REGALO #1
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                      Microsoft Flight Simulator 2024
                    </h2>
                  </div>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-cyan-500/30 mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold border-b border-white/10 pb-2">
                    <span>ESTADO EN STEAM:</span>
                    <span className="bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> YA EN TU BIBLIOTECA
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Ya tienes disponible en tu biblioteca de Steam el juego <strong>Microsoft Flight Simulator 2024</strong>. ¡A volar!
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/80 pt-2 border-t border-cyan-500/20">
                <span>Plataforma: Steam PC</span>
                <span>Calidad: Ultra 4K</span>
              </div>
            </motion.div>

            {/* GIFT 2: TRIP TO MÁLAGA "A TODO TRAPO" */}
            <motion.div
              id="gift-card-trip-malaga"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="group relative rounded-2xl p-6 bg-gradient-to-br from-amber-950/70 to-yellow-950/80 border-2 border-amber-400 shadow-xl shadow-amber-500/20 flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold rounded-bl-xl border-b border-l border-amber-500/40 uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> VIP Boarding Pass
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-amber-500 text-slate-950 rounded-xl shadow-md">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider block">
                      REGALO #2 (EL DESTINO)
                    </span>
                    <h2 className="text-xl font-bold text-white tracking-wide">
                      ¡Nos vamos de viaje a Málaga!
                    </h2>
                  </div>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-amber-500/30 mb-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-amber-300 font-mono text-xs font-bold">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Fechas: 25 al 27 de Septiembre</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-200 font-mono text-xs">
                    <MapPin className="w-4 h-4 text-rose-400" />
                    <span>Destino: Málaga (Costa del Sol, Andalucía) ☀️🏖️</span>
                  </div>

                  {/* EXACT REQUIRED PHRASE HIGHLIGHTED */}
                  <div className="p-3 bg-amber-500/20 border-2 border-amber-400 rounded-lg text-center shadow-inner">
                    <span className="text-[11px] font-mono text-amber-300 block uppercase font-bold">
                      Condición y estilo oficial del viaje:
                    </span>
                    <p className="text-lg md:text-xl font-extrabold text-amber-200 tracking-wide mt-0.5">
                      &ldquo;A TODO TRAPO&rdquo;
                    </p>
                  </div>

                  <p className="text-[11px] text-zinc-300 leading-relaxed italic">
                    Que nos vamos de viaje a Málaga del 25 al 27 de septiembre <strong>&ldquo;a todo trapo&rdquo;</strong>. Espetos a pie de playa, chiringuitos, calle Larios y el mejor fin de semana.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-amber-300/80 pt-2 border-t border-amber-500/20">
                <span>Pasajeros: Hermanos Dorta</span>
                <span>Modalidad: VIP Deluxe</span>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <button
                id="celebrate-confetti-btn"
                onClick={() => {
                  playClickSound();
                  triggerGrandConfetti();
                }}
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold text-xs font-mono rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                ¡Lanzar Más Confeti!
              </button>

              <button
                id="play-fanfare-again-btn"
                onClick={() => {
                  playEpicFanfare();
                }}
                className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono rounded-xl border border-zinc-600 transition flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                Repetir Fanfarria
              </button>
            </div>

            <button
              id="restart-escape-room-btn"
              onClick={() => {
                playClickSound();
                onRestart();
              }}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-mono rounded-xl border border-zinc-700 transition flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Reiniciar Escape Room
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
