import React, { useState } from 'react';
import { motion } from 'motion/react';
import { NuclearConsoleData, QuoteModalData } from '../types';
import { playClickSound, playNuclearKlaxon, playKeyUnlockSound, playBuzzErrorSound } from '../utils/audio';
import { SIMPSONS_QUOTES } from '../data/quotes';
import { Zap, AlertTriangle, Key, CheckCircle2, RefreshCw } from 'lucide-react';

interface Props {
  isUnlocked: boolean;
  onUnlockKey: () => void;
  onShowQuote: (quote: Omit<QuoteModalData, 'isOpen'>) => void;
}

export const Sector7GPanel: React.FC<Props> = ({ isUnlocked, onUnlockKey, onShowQuote }) => {
  const [data, setData] = useState<NuclearConsoleData>({
    rod1: 0,
    rod2: 0,
    rod3: 0,
    passwordInput: '',
  });

  const [donutEatenCount, setDonutEatenCount] = useState(0);
  const [birdActive, setBirdActive] = useState(false);
  const [noteRevealed, setNoteRevealed] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);

  // Target rod combination: 7 - 4 - 2 (Evergreen Terrace 742)
  const isRodComboCorrect = data.rod1 === 7 && data.rod2 === 4 && data.rod3 === 2;
  const isPasswordMatch = (val: string) => ['MORDISCOS', 'CUCA', 'BITEY'].includes(val.trim().toUpperCase());

  const handleRodChange = (rodIndex: 1 | 2 | 3, delta: number) => {
    playClickSound();
    setData((prev) => {
      const key = `rod${rodIndex}` as keyof NuclearConsoleData;
      const current = prev[key] as number;
      const nextVal = (current + delta + 10) % 10;
      const updated = { ...prev, [key]: nextVal };

      // Check if unlocked
      if (
        (updated.rod1 === 7 && updated.rod2 === 4 && updated.rod3 === 2) &&
        (isPasswordMatch(updated.passwordInput) || donutEatenCount >= 3) &&
        !isUnlocked
      ) {
        playKeyUnlockSound();
        onUnlockKey();
      }

      return updated;
    });
  };

  const handleDonutClick = () => {
    playClickSound();
    const nextCount = donutEatenCount + 1;
    setDonutEatenCount(nextCount);

    if (nextCount === 1) {
      onShowQuote({
        character: 'Homer',
        quote: 'Mmm... rosquilla con virutas radiactivas... ¡Mmm... deliciosa!',
        source: 'Los Simpson (España)',
        emoji: '🍩',
        soundType: 'homer',
      });
    } else if (nextCount === 2) {
      onShowQuote({
        character: 'Homer',
        quote: '¡Oye! ¡Deja mi rosquilla o llamo al sindicato de Homer!',
        source: 'Los Simpson (España)',
        emoji: '🍩',
        soundType: 'homer',
      });
    } else if (nextCount >= 3) {
      onShowQuote({
        character: 'Homer',
        quote: '¡Mosquis! ¡Había una llave maestra de plutonio dentro de la masa!',
        source: 'Los Simpson (España)',
        emoji: '🔑',
        soundType: 'chime',
      });
      if (!isUnlocked) {
        playKeyUnlockSound();
        onUnlockKey();
      }
    }
  };

  const handleBigRedButton = () => {
    playNuclearKlaxon();
    setAlarmActive(true);
    setTimeout(() => setAlarmActive(false), 3000);
    
    // Pick random Simpson quote
    const quote = SIMPSONS_QUOTES[Math.floor(Math.random() * SIMPSONS_QUOTES.length)];
    onShowQuote(quote);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (data.passwordInput.trim().toUpperCase() === 'MORDISCOS') {
      playKeyUnlockSound();
      onShowQuote({
        character: 'Homer',
        quote: '¡Bingo! ¡A la grande le puse Mordiscos! Protocolo nuclear desbloqueado.',
        source: 'Los Simpson (España)',
        emoji: '🐀',
        soundType: 'chime',
      });
      if (!isUnlocked) {
        onUnlockKey();
      }
    } else {
      playBuzzErrorSound();
      onShowQuote({
        character: 'Homer',
        quote: '¡Contraseña errónea! Pista: Es el nombre de la zarigüeya grande del monorraíl...',
        source: 'Los Simpson (España)',
        emoji: '❌',
        soundType: 'buzz',
      });
    }
  };

  const handleDrinkingBird = () => {
    playClickSound();
    setBirdActive(true);
    setData((prev) => ({ ...prev, passwordInput: 'MORDISCOS' }));
    setTimeout(() => {
      setBirdActive(false);
      onShowQuote({
        character: 'Homer',
        quote: '¡Miren el pajarito! ¡Está escribiendo la contraseña por mí! ¡Soy un genio!',
        source: 'Los Simpson (España)',
        emoji: '🐦',
        soundType: 'homer',
      });
    }, 800);
  };

  return (
    <div
      id="sector-7g-panel"
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
        isUnlocked
          ? 'bg-amber-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/10'
          : 'bg-zinc-900/90 border-amber-500/60 shadow-xl'
      } ${alarmActive ? 'ring-4 ring-rose-500 ring-offset-2 ring-offset-black animate-pulse' : ''}`}
    >
      {/* Danger Tape Header */}
      <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-amber-300 font-mono tracking-wider flex items-center gap-2">
              SECTOR 7G • CONSOLA NUCLEAR
              {isUnlocked && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LLAVE OBTENIDA
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-400">Puesto de Seguridad de Homer J. Simpson</p>
          </div>
        </div>

        {/* Big Red Button */}
        <button
          id="homer-big-red-button"
          onClick={handleBigRedButton}
          className="group relative px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg font-mono text-xs font-bold shadow-md shadow-rose-600/30 active:scale-95 transition flex items-center gap-1.5"
          title="Botón de Emergencia (¡NO TOCAR!)"
        >
          <AlertTriangle className="w-3.5 h-3.5 group-hover:animate-bounce" />
          <span>¡NO TOCAR!</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left column: Radioactive Rods & Gauges */}
        <div className="md:col-span-7 bg-black/50 p-4 rounded-xl border border-zinc-700/80">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              Calibración de Barras de Núcleo (3 Dígitos)
            </span>
            <button
              id="reveal-homer-note-btn"
              onClick={() => {
                playClickSound();
                setNoteRevealed(!noteRevealed);
              }}
              className="text-[11px] font-mono text-zinc-400 hover:text-amber-300 underline cursor-pointer"
            >
              {noteRevealed ? 'Ocultar post-it' : '🔍 Ver post-it pegado'}
            </button>
          </div>

          {noteRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-3 p-2.5 bg-yellow-200 text-yellow-900 rounded font-sans text-xs shadow-md border-l-4 border-amber-600 rotate-[-1deg]"
            >
              <p className="font-bold">📝 Nota de Homer:</p>
              <p className="italic">&ldquo;Número de casa en Evergreen Terrace: 7 - 4 - 2. Y a la grande le puse... Mordiscos.&rdquo;</p>
            </motion.div>
          )}

          {/* 3 Rod Controls */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((num) => {
              const rodVal = data[`rod${num as 1 | 2 | 3}`];
              const isTarget =
                (num === 1 && rodVal === 7) ||
                (num === 2 && rodVal === 4) ||
                (num === 3 && rodVal === 2);

              return (
                <div
                  key={num}
                  id={`rod-control-${num}`}
                  className={`p-3 rounded-lg border text-center flex flex-col items-center justify-between ${
                    isTarget
                      ? 'bg-emerald-950/40 border-emerald-500/70 text-emerald-300'
                      : 'bg-zinc-800/80 border-zinc-600 text-zinc-200'
                  }`}
                >
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Barra #{num}</span>
                  <button
                    id={`rod-${num}-up`}
                    onClick={() => handleRodChange(num as 1 | 2 | 3, 1)}
                    className="w-full py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-100 font-mono active:scale-95"
                  >
                    ▲
                  </button>
                  <div className="my-1.5 text-2xl font-mono font-bold tracking-widest text-amber-400">
                    {rodVal}
                  </div>
                  <button
                    id={`rod-${num}-down`}
                    onClick={() => handleRodChange(num as 1 | 2 | 3, -1)}
                    className="w-full py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded text-zinc-100 font-mono active:scale-95"
                  >
                    ▼
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400">Estado de Núcleo:</span>
            <span className={isRodComboCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
              {isRodComboCorrect ? '🟢 7-4-2 ALINEADO' : '🟡 DESALINEADO'}
            </span>
          </div>
        </div>

        {/* Right column: Homer's Desktop Items & Password */}
        <div className="md:col-span-5 flex flex-col gap-3">
          {/* Password Form */}
          <div className="p-3 bg-black/60 rounded-xl border border-zinc-700 flex-1">
            <span className="text-xs font-mono text-zinc-300 block mb-1 font-semibold">
              Terminal de Autorización:
            </span>
            <form onSubmit={handlePasswordSubmit} className="space-y-2">
              <input
                id="sector-7g-password-input"
                type="text"
                value={data.passwordInput}
                onChange={(e) => setData({ ...data, passwordInput: e.target.value.toUpperCase() })}
                placeholder="Escribe la Clave"
                maxLength={10}
                className="w-full bg-zinc-900 border border-zinc-600 rounded px-2.5 py-1.5 text-xs font-mono text-amber-300 placeholder-zinc-500 focus:outline-hidden focus:border-amber-400 uppercase tracking-widest"
              />
              <button
                id="submit-7g-password-btn"
                type="submit"
                className="w-full py-1.5 bg-amber-600 hover:bg-amber-500 text-black font-mono font-bold text-xs rounded transition uppercase tracking-wider"
              >
                Validar Clave
              </button>
            </form>
          </div>

          {/* Interactive Props: Donut & Drinking Bird */}
          <div className="grid grid-cols-2 gap-2">
            <button
              id="homer-donut-item"
              onClick={handleDonutClick}
              className="p-2.5 bg-pink-950/40 hover:bg-pink-900/60 border border-pink-500/40 rounded-xl text-left transition flex items-center gap-2 group"
              title="Rosquilla glaseada (Hacer clic varias veces)"
            >
              <span className="text-2xl group-hover:scale-125 transition-transform">🍩</span>
              <div>
                <span className="text-[11px] font-bold text-pink-300 block leading-tight">Rosquilla</span>
                <span className="text-[9px] text-pink-400/80 font-mono">
                  {donutEatenCount === 0 ? 'Sin tocar' : `Mordiscos: ${donutEatenCount}/3`}
                </span>
              </div>
            </button>

            <button
              id="drinking-bird-item"
              onClick={handleDrinkingBird}
              className={`p-2.5 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 rounded-xl text-left transition flex items-center gap-2 group ${
                birdActive ? 'ring-2 ring-cyan-400' : ''
              }`}
              title="Pajarito que bebe agua (Autocompleta teclas)"
            >
              <span className={`text-2xl transition-transform ${birdActive ? 'animate-bounce' : 'group-hover:rotate-12'}`}>
                🐦
              </span>
              <div>
                <span className="text-[11px] font-bold text-blue-300 block leading-tight">Pajarito Y/N</span>
                <span className="text-[9px] text-blue-400/80 font-mono">Pulsa teclado</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Key reward banner when unlocked */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-emerald-950/60 border border-emerald-500/60 rounded-xl flex items-center justify-between text-emerald-300 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-amber-400 animate-spin" />
            <span className="font-bold">LLAVE 1/2 DESBLOQUEADA:</span>
            <span>Plutonio-7G de Springfield activado</span>
          </div>
          <span className="text-[10px] bg-emerald-500/30 px-2 py-0.5 rounded text-emerald-200">
            LISTA PARA EL PANEL
          </span>
        </motion.div>
      )}
    </div>
  );
};
