import React from 'react';
import { ClueState, GamePhase } from '../types';
import { Key, Sparkles, HelpCircle, Plane, Zap, Briefcase } from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface Props {
  clues: ClueState;
  gamePhase: GamePhase;
  onOpenHints: () => void;
  onMasterActivate: () => void;
  onSwitchPhase?: (phase: GamePhase) => void;
}

export const HeaderBar: React.FC<Props> = ({ clues, gamePhase, onOpenHints, onMasterActivate, onSwitchPhase }) => {
  const phase1Unlocked = (clues.nuclearKey ? 1 : 0) + (clues.vandelayKey ? 1 : 0);
  const phase1Complete = phase1Unlocked === 2;

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 border-b border-zinc-800 backdrop-blur-md px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Title and Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl text-black shadow-md font-bold text-lg">
            {gamePhase === 'phase1_office' ? '☢️' : '✈️'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm md:text-base font-bold text-zinc-100 font-mono tracking-wide">
                OPERACIÓN VANDELAY-7G
              </h1>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase border ${
                gamePhase === 'phase1_office'
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                {gamePhase === 'phase1_office' ? 'Fase 1: Sector 7G × Vandelay' : 'Fase 2: Radar de Navegación'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans">
              {gamePhase === 'phase1_office'
                ? 'Escape Room • Desbloquea las 2 llaves de la oficina'
                : 'Fase Final • Calibra el vector de aproximación aérea'}
            </p>
          </div>
        </div>

        {/* Phase Status Indicators */}
        <div className="flex items-center gap-2 sm:gap-3 bg-zinc-900/90 border border-zinc-700/80 px-3 py-1.5 rounded-xl">
          {gamePhase === 'phase1_office' ? (
            <>
              {/* Key 1: Nuclear */}
              <div
                id="status-key-nuclear"
                className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg transition ${
                  clues.nuclearKey
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 font-bold'
                    : 'text-zinc-500 bg-zinc-800/40'
                }`}
                title="Llave 1: Plutonio Sector 7G (Homer)"
              >
                <Zap className={`w-3.5 h-3.5 ${clues.nuclearKey ? 'text-amber-400' : 'text-zinc-600'}`} />
                <span>Sector 7G</span>
              </div>

              {/* Key 2: Vandelay */}
              <div
                id="status-key-vandelay"
                className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg transition ${
                  clues.vandelayKey
                    ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 font-bold'
                    : 'text-zinc-500 bg-zinc-800/40'
                }`}
                title="Llave 2: Látex Vandelay (George)"
              >
                <Briefcase className={`w-3.5 h-3.5 ${clues.vandelayKey ? 'text-cyan-400' : 'text-zinc-600'}`} />
                <span>Vandelay</span>
              </div>

              <span className="text-xs font-mono text-zinc-400 ml-1 font-bold">
                [{phase1Unlocked}/2]
              </span>
            </>
          ) : (
            <>
              <div
                id="status-key-radar"
                className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-lg transition ${
                  clues.radarKey
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60 font-bold'
                    : 'text-amber-400 bg-amber-950/40 border border-amber-500/40'
                }`}
              >
                <Plane className="w-3.5 h-3.5 animate-pulse" />
                <span>{clues.radarKey ? 'RADAR AUTORIZADO' : 'SINTONIZANDO LEMG...'}</span>
              </div>
            </>
          )}
        </div>

        {/* Action buttons: Hints & Switch (if available) */}
        <div className="flex items-center gap-2">
          <button
            id="open-hints-btn"
            onClick={() => {
              playClickSound();
              onOpenHints();
            }}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-xl border border-zinc-700 text-xs font-mono flex items-center gap-1.5 transition cursor-pointer"
            title="Ver pistas si estás atascado"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Pistas</span>
          </button>

          {gamePhase === 'phase2_radar' && onSwitchPhase && (
            <button
              id="switch-to-office-btn"
              onClick={() => {
                playClickSound();
                onSwitchPhase('phase1_office');
              }}
              className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded-xl border border-zinc-700 text-xs font-mono transition cursor-pointer"
              title="Volver a la oficina"
            >
              🏢 Oficina
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
