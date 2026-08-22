import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteModalData } from '../types';
import { X, MessageSquareQuote, Radio } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  data: QuoteModalData;
  onClose: () => void;
}

export const HumorModal: React.FC<Props> = ({ data, onClose }) => {
  if (!data.isOpen) return null;

  const isSimpsons = data.source === 'Los Simpson (España)';

  return (
    <AnimatePresence>
      <div 
        id="humor-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        onClick={() => {
          playClickSound();
          onClose();
        }}
      >
        <motion.div
          id="humor-modal-container"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-lg overflow-hidden rounded-xl border-2 shadow-2xl p-6 ${
            isSimpsons
              ? 'bg-amber-950/95 border-amber-400 text-amber-100 shadow-amber-500/20'
              : 'bg-slate-900/95 border-cyan-400 text-slate-100 shadow-cyan-500/20'
          }`}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl animate-bounce">{data.emoji}</span>
              <div>
                <span className="text-xs font-mono tracking-widest uppercase font-bold text-amber-300 flex items-center gap-1">
                  <Radio className="w-3 h-3 animate-pulse" />
                  INTERRUPCIÓN DEL SISTEMA
                </span>
                <h3 className="text-sm font-semibold text-white/80">
                  {data.character} • <span className="italic">{data.source}</span>
                </h3>
              </div>
            </div>
            <button
              id="close-humor-modal-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-white/80 hover:text-white"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quote Content */}
          <div className="py-3 px-4 bg-black/40 rounded-lg border border-white/5 my-2 flex items-start gap-3">
            <MessageSquareQuote className="w-8 h-8 text-amber-400 shrink-0 opacity-80 mt-1" />
            <p className="text-lg md:text-xl font-bold font-serif leading-relaxed text-amber-200 tracking-wide">
              &ldquo;{data.quote}&rdquo;
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between pt-2">
            <span className="text-[11px] font-mono text-white/40">
              [SECTOR 7G // VANDELAY INTERCOM]
            </span>
            <button
              id="dismiss-quote-btn"
              onClick={() => {
                playClickSound();
                onClose();
              }}
              className={`px-4 py-1.5 text-xs font-mono font-bold rounded uppercase transition tracking-wider ${
                isSimpsons
                  ? 'bg-amber-500 text-black hover:bg-amber-400'
                  : 'bg-cyan-500 text-black hover:bg-cyan-400'
              }`}
            >
              ¡Entendido, jefe! (Cerrar)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
