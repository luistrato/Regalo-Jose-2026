import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lightbulb } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  gamePhase?: 'phase1_office' | 'phase2_radar';
}

export const HintsModal: React.FC<Props> = ({ isOpen, onClose, gamePhase = 'phase1_office' }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="hints-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
        onClick={() => {
          playClickSound();
          onClose();
        }}
      >
        <motion.div
          id="hints-modal-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-zinc-900 border-2 border-amber-400/80 rounded-2xl p-6 shadow-2xl text-zinc-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-700 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-mono text-amber-300">
                GUÍA DE PISTAS • OPERACIÓN VANDELAY-7G
              </h3>
            </div>
            <button
              id="close-hints-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Clue 1 */}
            <div className="p-3 bg-black/40 rounded-xl border border-amber-500/30">
              <h4 className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                <span>🍩</span> 1. Sector 7G (Consola de Homer):
              </h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Número de la casa de Homer en Evergreen Terrace: <span className="text-amber-300 font-bold">7 - 4 - 2</span>.</li>
                <li>Contraseña de la zarigüeya grande del monorraíl: <span className="text-amber-300 font-bold">MORDISCOS</span> (o usa el pajarito que teclea por ti).</li>
                <li>¿Prefieres comida? Haz clic 3 veces en la rosquilla rosa para encontrar la llave escondida.</li>
              </ul>
            </div>

            {/* Clue 2 */}
            <div className="p-3 bg-black/40 rounded-xl border border-cyan-500/30">
              <h4 className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                <span>🥨</span> 2. Vandelay Industries (Escritorio de George):
              </h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Selecciona el ramo comercial oficial de Art Vandelay: <span className="text-cyan-300 font-bold">LÁTEX</span>.</li>
                <li>Haz clic en los pretzels para que George tenga sed y revele la servilleta.</li>
                <li>Introduce la clave <span className="text-cyan-300 font-bold">LATEX</span> en la caja fuerte.</li>
              </ul>
            </div>

            {/* Clue 3: Radar */}
            <div className="p-3 bg-black/40 rounded-xl border border-emerald-500/30">
              <h4 className="font-bold text-emerald-300 mb-1 flex items-center gap-1.5">
                <span>✈️</span> 3. Radar de Navegación Aérea:
              </h4>
              <ul className="list-disc list-inside space-y-1 text-zinc-300">
                <li>Selecciona el aeropuerto de destino <span className="text-emerald-300 font-bold">LEMG</span> (Málaga - Costa del Sol).</li>
                <li>Sintoniza la frecuencia de la torre de control a <span className="text-emerald-300 font-bold">124.85 MHz</span>.</li>
                <li>Elige la pista de aproximación instrumental por la bahía: <span className="text-emerald-300 font-bold">RWY-13</span>.</li>
              </ul>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-zinc-800 flex justify-end">
            <button
              id="confirm-hints-closed-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-lg uppercase tracking-wider font-mono"
            >
              Cerrar Pistas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
