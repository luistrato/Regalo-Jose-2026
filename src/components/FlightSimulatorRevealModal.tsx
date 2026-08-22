import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Plane, Gamepad2, Sparkles, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playEpicFanfare, playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onContinueToRadar: () => void;
}

export const FlightSimulatorRevealModal: React.FC<Props> = ({ isOpen, onContinueToRadar }) => {
  useEffect(() => {
    if (isOpen) {
      playEpicFanfare();
      triggerConfetti();
    }
  }, [isOpen]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#fbbf24'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#06b6d4', '#3b82f6', '#10b981', '#fbbf24'],
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
        id="flight-sim-reveal-overlay"
        className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-4 md:p-8 flex items-center justify-center"
      >
        <motion.div
          id="flight-sim-reveal-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 260 }}
          className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-zinc-900 to-black border-2 border-cyan-400 rounded-3xl p-6 md:p-9 shadow-2xl shadow-cyan-500/20 text-white my-auto overflow-hidden"
        >
          {/* Decorative glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badge */}
          <div className="text-center mb-6 relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-lg"
            >
              <Trophy className="w-4 h-4 text-cyan-400" />
              ¡PRIMERA FASE DESBLOQUEADA!
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-200 font-serif">
              ¡FELICIDADES, BRO! 🎉
            </h1>
            <p className="text-zinc-300 text-sm mt-2 max-w-md mx-auto">
              Has superado el Sector 7G y las oficinas de Vandelay. Tu primer regalo oficial ha sido liberado:
            </p>
          </div>

          {/* THE GIFT CARD */}
          <div className="relative z-10 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl p-6 bg-gradient-to-br from-slate-900/90 to-blue-950/90 border-2 border-cyan-400 shadow-xl shadow-cyan-500/10 flex flex-col justify-between overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 p-3 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold rounded-bl-xl border-b border-l border-cyan-500/40 uppercase flex items-center gap-1">
                <Gamepad2 className="w-3.5 h-3.5" /> Steam Library
              </div>

              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3.5 bg-cyan-500 text-slate-950 rounded-2xl shadow-lg shadow-cyan-500/40">
                    <Plane className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block">
                      REGALO DESBLOQUEADO
                    </span>
                    <h2 className="text-2xl font-extrabold text-white tracking-wide">
                      Microsoft Flight Simulator 2024
                    </h2>
                  </div>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-cyan-500/30 space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs font-mono text-emerald-400 font-bold border-b border-white/10 pb-2">
                    <span>ESTADO EN STEAM:</span>
                    <span className="bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> YA EN TU BIBLIOTECA
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-zinc-200 leading-relaxed pt-1">
                    ¡Ya tienes disponible en tu biblioteca de Steam el juego <strong>&ldquo;Microsoft Flight Simulator 2024&rdquo;</strong>! La experiencia de aviación definitiva te está esperando.
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/80 pt-2 border-t border-cyan-500/20">
                  <span>Plataforma: Steam PC</span>
                  <span>Edición: 2024 Oficial</span>
                  <span>Estado: Listo para jugar</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sequential Mystery Action Button */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.button
              id="continue-to-radar-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                playClickSound();
                onContinueToRadar();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-sm md:text-base tracking-wide shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 transition cursor-pointer border-2 border-yellow-200"
            >
              <Sparkles className="w-5 h-5 text-amber-950 animate-spin" />
              <span>¡Espera! Creo que hay algo más por aquí...</span>
              <ArrowRight className="w-5 h-5 text-amber-950" />
            </motion.button>
            <p className="text-[11px] font-mono text-zinc-400 mt-2 text-center">
              Parece que los sensores detectan una señal secundaria en el radar...
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
