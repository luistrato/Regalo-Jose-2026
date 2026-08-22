import React, { useState } from 'react';
import { motion } from 'motion/react';
import { VandelayData, QuoteModalData } from '../types';
import { playClickSound, playKeyUnlockSound, playBuzzErrorSound } from '../utils/audio';
import { Briefcase, Key, CheckCircle2, Lock, Unlock, FileText } from 'lucide-react';

interface Props {
  isUnlocked: boolean;
  onUnlockKey: () => void;
  onShowQuote: (quote: Omit<QuoteModalData, 'isOpen'>) => void;
}

export const VandelayDeskPanel: React.FC<Props> = ({ isUnlocked, onUnlockKey, onShowQuote }) => {
  const [data, setData] = useState<VandelayData>({
    donutClicks: 0,
    pretzelClicks: 0,
    safeCode: '',
    selectedRole: '',
  });

  const [deskDrawerOpen, setDeskDrawerOpen] = useState(false);
  const [napUnderDesk, setNapUnderDesk] = useState(false);
  const [revealedMemo, setRevealedMemo] = useState(false);

  const handlePretzelClick = () => {
    playClickSound();
    const count = data.pretzelClicks + 1;
    setData((prev) => ({ ...prev, pretzelClicks: count }));

    if (count === 1) {
      onShowQuote({
        character: 'George',
        quote: '¡Estos pretzels me están dando una sed! ¡Mucha sed!',
        source: 'Seinfeld',
        emoji: '🥨',
        soundType: 'serenity',
      });
    } else if (count === 2) {
      onShowQuote({
        character: 'George',
        quote: '¡En serio, necesito agua! Pero espera... hay una servilleta grasienta debajo del plato...',
        source: 'Seinfeld',
        emoji: '🥨',
        soundType: 'serenity',
      });
      setRevealedMemo(true);
    } else {
      onShowQuote({
        character: 'George',
        quote: '¡Suficientes pretzels! La clave en la servilleta dice "LATEX" para la caja fuerte.',
        source: 'Seinfeld',
        emoji: '📜',
        soundType: 'click',
      });
      setRevealedMemo(true);
    }
  };

  const handleFestivusClick = () => {
    playClickSound();
    onShowQuote({
      character: 'Kramer',
      quote: '¡Festivus for the rest of us! ¡Demostración de fuerza y quejas sobre la familia!',
      source: 'Seinfeld',
      emoji: '💈',
      soundType: 'chime',
    });
  };

  const handleSoupClick = () => {
    playBuzzErrorSound();
    onShowQuote({
      character: 'SoupNazi',
      quote: '¡No soup for you! (¡Sopa no para ti! ¡Vuelve dentro de un año!)',
      source: 'Seinfeld',
      emoji: '🍲',
      soundType: 'buzz',
    });
  };

  const handleNapClick = () => {
    playClickSound();
    setNapUnderDesk(!napUnderDesk);
    if (!napUnderDesk) {
      onShowQuote({
        character: 'George',
        quote: 'He modificado el escritorio para echarme siestas durante el horario laboral. ¡Nadie se dará cuenta!',
        source: 'Seinfeld',
        emoji: '🛌',
        soundType: 'click',
      });
    }
  };

  const handleRoleSelect = (role: string) => {
    playClickSound();
    setData((prev) => ({ ...prev, selectedRole: role }));
    if (role === 'latex') {
      onShowQuote({
        character: 'George',
        quote: '¡Exacto! Art Vandelay: Importador y exportador de productos de LÁTEX.',
        source: 'Seinfeld',
        emoji: '🧤',
        soundType: 'chime',
      });
    } else {
      onShowQuote({
        character: 'George',
        quote: '¿Qué? ¡No! Vandelay Industries no se dedica a eso. ¡Somos líderes en LÁTEX!',
        source: 'Seinfeld',
        emoji: '❌',
        soundType: 'buzz',
      });
    }
  };

  const handleSafeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = data.safeCode.trim().toUpperCase();
    if (code === 'LATEX' || code === 'ART VANDELAY' || code === 'ART') {
      playKeyUnlockSound();
      onShowQuote({
        character: 'George',
        quote: '¡Caja fuerte abierta! ¡He aquí el sello de exportación de Vandelay Industries!',
        source: 'Seinfeld',
        emoji: '🔑',
        soundType: 'chime',
      });
      if (!isUnlocked) {
        onUnlockKey();
      }
    } else {
      playBuzzErrorSound();
      onShowQuote({
        character: 'George',
        quote: '¡Código incorrecto! ¿Acaso no has leído la servilleta de los pretzels? ¡El negocio es el L-A-T-E-X!',
        source: 'Seinfeld',
        emoji: '🚫',
        soundType: 'buzz',
      });
    }
  };

  return (
    <div
      id="vandelay-desk-panel"
      className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
        isUnlocked
          ? 'bg-slate-950/40 border-cyan-500/80 shadow-lg shadow-cyan-500/10'
          : 'bg-zinc-900/90 border-cyan-500/60 shadow-xl'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-cyan-500/20 text-cyan-400 rounded-lg">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-cyan-300 font-mono tracking-wider flex items-center gap-2">
              VANDELAY INDUSTRIES • ARCHIVADOR
              {isUnlocked && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/50 flex items-center gap-1 font-sans">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LLAVE OBTENIDA
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-400">Oficina Ejecutiva de George Costanza (Art Vandelay)</p>
          </div>
        </div>

        {/* Festivus Pole */}
        <button
          id="festivus-pole-btn"
          onClick={handleFestivusClick}
          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-mono border border-zinc-600 flex items-center gap-1"
          title="Poste de Festivus (Aluminio no decorado)"
        >
          <span>💈 Festivus</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Interactive desk props */}
        <div className="md:col-span-6 bg-black/50 p-4 rounded-xl border border-zinc-700/80 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block mb-2">
              Objetos del Escritorio de George:
            </span>

            <div className="grid grid-cols-2 gap-2">
              {/* Pretzels */}
              <button
                id="george-pretzels-btn"
                onClick={handlePretzelClick}
                className="p-3 bg-amber-950/30 hover:bg-amber-900/50 border border-amber-600/40 rounded-xl text-left transition group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-125 transition-transform">🥨</span>
                  <div>
                    <span className="text-xs font-bold text-amber-200 block leading-tight">Pretzels</span>
                    <span className="text-[10px] text-amber-400/80 font-mono">
                      {data.pretzelClicks === 0 ? 'Hacer clic' : `Comidos: ${data.pretzelClicks}`}
                    </span>
                  </div>
                </div>
              </button>

              {/* Soup Cup */}
              <button
                id="soup-bowl-btn"
                onClick={handleSoupClick}
                className="p-3 bg-red-950/30 hover:bg-red-900/50 border border-red-600/40 rounded-xl text-left transition group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-125 transition-transform">🍲</span>
                  <div>
                    <span className="text-xs font-bold text-red-200 block leading-tight">Sopa Caliente</span>
                    <span className="text-[10px] text-red-400/80 font-mono">Cuidado...</span>
                  </div>
                </div>
              </button>

              {/* Nap Compartment */}
              <button
                id="nap-compartment-btn"
                onClick={handleNapClick}
                className={`p-3 border rounded-xl text-left transition ${
                  napUnderDesk
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                    : 'bg-zinc-800/60 hover:bg-zinc-700/60 border-zinc-600 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🛌</span>
                  <div>
                    <span className="text-xs font-bold block leading-tight">Cubículo Siesta</span>
                    <span className="text-[10px] font-mono opacity-80">
                      {napUnderDesk ? '💤 Zzz...' : 'Debajo de la mesa'}
                    </span>
                  </div>
                </div>
              </button>

              {/* Drawer */}
              <button
                id="drawer-toggle-btn"
                onClick={() => {
                  playClickSound();
                  setDeskDrawerOpen(!deskDrawerOpen);
                }}
                className="p-3 bg-zinc-800/60 hover:bg-zinc-700/60 border border-zinc-600 rounded-xl text-left transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📁</span>
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block leading-tight">Cajón Secreto</span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {deskDrawerOpen ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Nap note or Drawer contents */}
          {deskDrawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 p-2.5 bg-cyan-950/40 border border-cyan-500/40 rounded-lg text-xs font-mono text-cyan-200"
            >
              <p className="font-bold flex items-center gap-1 text-cyan-300">
                <FileText className="w-3.5 h-3.5" /> Ficha de Empleado Vandelay:
              </p>
              <p className="text-[11px] text-zinc-300 mt-1">
                Especialidad de la empresa: <span className="text-amber-300 font-bold underline">LÁTEX</span>.
              </p>
            </motion.div>
          )}

          {revealedMemo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-3 p-2.5 bg-yellow-100 text-yellow-950 rounded-lg text-xs font-sans shadow-md border-l-4 border-amber-500"
            >
              <p className="font-bold">📜 Servilleta manchada de pretzel:</p>
              <p className="font-mono text-xs mt-0.5">
                Clave de acceso a la caja fuerte: <strong className="text-red-700 tracking-widest text-sm">LATEX</strong>
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Column: Safe & Business Category */}
        <div className="md:col-span-6 flex flex-col gap-3">
          {/* Sector / Role selector */}
          <div className="p-3 bg-black/60 rounded-xl border border-zinc-700">
            <span className="text-xs font-mono text-zinc-300 block mb-2 font-semibold">
              1. Selección de Ramo Comercial:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-center">
              {[
                { id: 'patatas', label: '🥔 Patatas' },
                { id: 'latex', label: '🧤 LÁTEX' },
                { id: 'cerillas', label: '🔥 Cerillas' },
              ].map((item) => (
                <button
                  key={item.id}
                  id={`role-btn-${item.id}`}
                  onClick={() => handleRoleSelect(item.id)}
                  className={`py-1.5 px-2 text-xs font-mono rounded border transition ${
                    data.selectedRole === item.id
                      ? item.id === 'latex'
                        ? 'bg-emerald-600 text-white border-emerald-400 font-bold'
                        : 'bg-rose-600 text-white border-rose-400'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Safe Code Form */}
          <div className="p-3 bg-black/60 rounded-xl border border-zinc-700 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1">
                  {isUnlocked ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
                  2. Combinación Caja Fuerte:
                </span>
                <span className="text-[10px] font-mono text-zinc-500">5 Caracteres</span>
              </div>

              <form onSubmit={handleSafeSubmit} className="space-y-2">
                <input
                  id="vandelay-safe-input"
                  type="text"
                  value={data.safeCode}
                  onChange={(e) => setData({ ...data, safeCode: e.target.value.toUpperCase() })}
                  placeholder="Escribe la clave (Ej: LATEX)"
                  maxLength={10}
                  className="w-full bg-zinc-900 border border-zinc-600 rounded px-2.5 py-1.5 text-xs font-mono text-cyan-300 placeholder-zinc-500 focus:outline-hidden focus:border-cyan-400 uppercase tracking-widest"
                />
                <button
                  id="submit-safe-code-btn"
                  type="submit"
                  className="w-full py-1.5 bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold text-xs rounded transition uppercase tracking-wider"
                >
                  Abrir Caja Fuerte
                </button>
              </form>
            </div>

            <p className="text-[10px] text-zinc-500 font-mono mt-2">
              * Insinuación: Los pretzels revelan secretos si los comes con insistencia.
            </p>
          </div>
        </div>
      </div>

      {/* Key reward banner when unlocked */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-cyan-950/60 border border-cyan-500/60 rounded-xl flex items-center justify-between text-cyan-300 font-mono text-xs"
        >
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="font-bold">LLAVE 2/2 DESBLOQUEADA:</span>
            <span>Credencial de Importación Art Vandelay</span>
          </div>
          <span className="text-[10px] bg-cyan-500/30 px-2 py-0.5 rounded text-cyan-200">
            LISTA PARA EL PANEL
          </span>
        </motion.div>
      )}
    </div>
  );
};
