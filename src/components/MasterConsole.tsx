import React from 'react';
import { motion } from 'motion/react';
import { ClueState } from '../types';
import { ShieldAlert, Lock, Unlock, Sparkles } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  clues: ClueState;
  onMasterActivate: () => void;
}

export const MasterConsole: React.FC<Props> = ({ clues, onMasterActivate }) => {
  const totalUnlocked = (clues.nuclearKey ? 1 : 0) + (clues.vandelayKey ? 1 : 0);
  const allUnlocked = totalUnlocked === 2;

  return (
    <div
      id="master-activation-console"
      className={`p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 ${
        allUnlocked
          ? 'bg-gradient-to-r from-amber-950/80 via-zinc-900 to-amber-950/80 border-amber-400 shadow-2xl shadow-amber-500/20'
          : 'bg-zinc-950/80 border-zinc-700/80 shadow-xl'
      }`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left info */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div
            className={`p-3.5 rounded-2xl border ${
              allUnlocked
                ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/40 animate-pulse'
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}
          >
            {allUnlocked ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>

          <div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <h2 className="text-lg font-bold text-zinc-100 font-mono tracking-wider">
                PANEL DE AUTORIZACIÓN SECTOR 7G & VANDELAY
              </h2>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                  allUnlocked
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                }`}
              >
                {allUnlocked ? 'SISTEMA LISTO' : `BLOQUEADO [${totalUnlocked}/2]`}
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              {allUnlocked
                ? '¡Ambas llaves de autorización han sido obtenidas! Pulsa el botón maestro para romper el sello y revelar el regalo.'
                : 'Resuelve las 2 pruebas (Sector 7G de Homer y Oficina Vandelay de George) para desbloquear el primer regalo.'}
            </p>
          </div>
        </div>

        {/* Master Activation Action Button */}
        <div>
          {allUnlocked ? (
            <motion.button
              id="master-lever-activate-btn"
              onClick={() => {
                playClickSound();
                onMasterActivate();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold font-mono text-sm uppercase rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-3 border-2 border-yellow-200 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 animate-spin" />
              <span>DESBLOQUEAR REGALO</span>
            </motion.button>
          ) : (
            <div className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-500 text-xs font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500/70" />
              <span>Faltan {2 - totalUnlocked} llaves por descubrir</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
