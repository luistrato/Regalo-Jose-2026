import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RadarData, QuoteModalData } from '../types';
import { playClickSound, playRadarBlip, playKeyUnlockSound, playBuzzErrorSound } from '../utils/audio';
import { Plane, Compass, CheckCircle2, Key, Radio, MapPin, Navigation, Sparkles } from 'lucide-react';

interface Props {
  isUnlocked: boolean;
  onUnlockKey: () => void;
  onShowQuote: (quote: Omit<QuoteModalData, 'isOpen'>) => void;
  onOpenFinalModal?: () => void;
}

export const FlightRadarPanel: React.FC<Props> = ({ isUnlocked, onUnlockKey, onShowQuote, onOpenFinalModal }) => {
  const [data, setData] = useState<RadarData>({
    frequency: 118.0,
    destination: 'MAD',
    runway: 'RWY-31',
  });

  const [radarActive, setRadarActive] = useState(true);
  const [revealedFlightManual, setRevealedFlightManual] = useState(false);

  // Targets: Frequency 124.85, destination 'LEMG', runway 'RWY-13'
  const isDestCorrect = data.destination === 'LEMG';
  const isRunwayCorrect = data.runway === 'RWY-13';
  const isFreqCorrect = Math.abs(data.frequency - 124.85) < 0.2;

  const handleDestinationSelect = (code: string) => {
    playClickSound();
    setData((prev) => ({ ...prev, destination: code }));

    if (code === 'LEMG') {
      playRadarBlip();
      onShowQuote({
        character: 'George',
        quote: '¡Destino LEMG fijado! ¡Málaga, Costa del Sol! ¡El mar estaba embravecido ese día!',
        source: 'Seinfeld',
        emoji: '🏖️',
        soundType: 'click',
      });
      checkAllConditions(code, data.frequency, data.runway);
    } else if (code === 'JFK') {
      onShowQuote({
        character: 'George',
        quote: '¿Nueva York? ¡Ya pasé demasiado tiempo esquivando palomas en Queens!',
        source: 'Seinfeld',
        emoji: '🗽',
        soundType: 'buzz',
      });
    } else {
      onShowQuote({
        character: 'Homer',
        quote: '¡No quiero ir ahí! Quiero sol, espetos de sardinas y buen clima andaluz...',
        source: 'Los Simpson (España)',
        emoji: '✈️',
        soundType: 'buzz',
      });
    }
  };

  const handleRunwaySelect = (rwy: string) => {
    playClickSound();
    setData((prev) => ({ ...prev, runway: rwy }));
    if (rwy === 'RWY-13') {
      playRadarBlip();
      onShowQuote({
        character: 'Kramer',
        quote: '¡Esa es la pista 13 con entrada directa sobre la bahía y el mar! ¡Alineación perfecta!',
        source: 'Seinfeld',
        emoji: '🛬',
        soundType: 'click',
      });
      checkAllConditions(data.destination, data.frequency, rwy);
    } else {
      onShowQuote({
        character: 'Kramer',
        quote: '¡Vientos cruzados en esa pista! Necesitamos la aproximación instrumental sobre la costa.',
        source: 'Seinfeld',
        emoji: '⚠️',
        soundType: 'buzz',
      });
    }
  };

  const handleFreqStep = (delta: number) => {
    playClickSound();
    setData((prev) => {
      const nextFreq = Number((prev.frequency + delta).toFixed(2));
      const updated = { ...prev, frequency: nextFreq };
      if (Math.abs(nextFreq - 124.85) < 0.1) {
        playRadarBlip();
      }
      checkAllConditions(updated.destination, updated.frequency, updated.runway);
      return updated;
    });
  };

  const checkAllConditions = (dest: string, freq: number, rwy: string) => {
    if (dest === 'LEMG' && rwy === 'RWY-13' && Math.abs(freq - 124.85) < 0.25) {
      if (!isUnlocked) {
        playKeyUnlockSound();
        onUnlockKey();
        onShowQuote({
          character: 'Kramer',
          quote: '¡Giddyup! ¡Vector de aproximación a Málaga fijado y autorizado! ¡Prepárense para el aterrizaje!',
          source: 'Seinfeld',
          emoji: '✈️',
          soundType: 'chime',
        });
      }
    }
  };

  const isAllComplete = isDestCorrect && isFreqCorrect && isRunwayCorrect;

  return (
    <div
      id="flight-radar-panel"
      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
        isUnlocked
          ? 'bg-emerald-950/40 border-emerald-500/80 shadow-2xl shadow-emerald-500/20'
          : 'bg-zinc-900/95 border-emerald-500/60 shadow-2xl'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-500/30 pb-4 mb-5 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Plane className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-emerald-300 font-mono tracking-wider flex items-center gap-2">
                RADAR DE NAVEGACIÓN Y APROXIMACIÓN AÉREA
              </h2>
              {isUnlocked && (
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-500/50 flex items-center gap-1 font-sans font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> AUTORIZADO
                </span>
              )}
            </div>
            <p className="text-xs text-zinc-400">Torre de Control Aéreo: Configura el plan de vuelo para desbloquear las coordenadas</p>
          </div>
        </div>

        <button
          id="reveal-flight-manual-btn"
          onClick={() => {
            playClickSound();
            setRevealedFlightManual(!revealedFlightManual);
          }}
          className="text-xs font-mono text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-500/40 cursor-pointer self-start sm:self-auto transition hover:bg-emerald-900/50"
        >
          {revealedFlightManual ? 'Ocultar bitácora' : '📖 Bitácora de Vuelo Confidencial'}
        </button>
      </div>

      {revealedFlightManual && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-3.5 bg-zinc-800/90 border border-emerald-500/50 rounded-xl font-mono text-xs text-emerald-200"
        >
          <p className="font-bold text-emerald-300 flex items-center gap-1.5 mb-1.5">
            <Radio className="w-4 h-4 text-amber-400" /> PLAN DE RUTA CONFIDENCIAL:
          </p>
          <ul className="list-disc list-inside space-y-1 text-zinc-300">
            <li>Aeropuerto de Destino: Código ICAO <strong className="text-amber-300">LEMG</strong> (Málaga - Costa del Sol)</li>
            <li>Frecuencia VHF de Torre / Aproximación: <strong className="text-amber-300">124.85 MHz</strong></li>
            <li>Pista de Aterrizaje Activa (Entrada instrumental por la bahía): <strong className="text-amber-300">RWY-13</strong></li>
          </ul>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Radar Screen Visualizer */}
        <div className="lg:col-span-6 bg-black p-4 rounded-xl border border-emerald-500/40 relative overflow-hidden flex flex-col items-center justify-center min-h-[260px]">
          {/* Radar Circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <div className="w-56 h-56 rounded-full border border-emerald-500"></div>
            <div className="w-40 h-40 rounded-full border border-emerald-500 absolute"></div>
            <div className="w-24 h-24 rounded-full border border-emerald-500 absolute"></div>
            <div className="w-full h-[1px] bg-emerald-500/40 absolute"></div>
            <div className="h-full w-[1px] bg-emerald-500/40 absolute"></div>
          </div>

          {/* Sweeping Radar Beam */}
          {radarActive && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute inset-0 origin-center pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.4) 0deg, transparent 60deg)',
              }}
            />
          )}

          {/* Blip for LEMG */}
          {isDestCorrect ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="relative z-10 p-3 bg-emerald-500/30 rounded-full border border-emerald-400 flex flex-col items-center text-center backdrop-blur-xs"
            >
              <Plane className="w-7 h-7 text-emerald-300 animate-pulse rotate-45" />
              <span className="text-[11px] font-mono font-bold text-emerald-200 mt-1.5 bg-black/90 px-2.5 py-1 rounded border border-emerald-500/60 shadow-lg">
                LEMG • MÁLAGA (36.67°N, 4.49°W)
              </span>
              <span className="text-[10px] font-mono text-amber-300 mt-1">
                {isRunwayCorrect ? 'PISTA 13 ALINEADA' : 'SELECCIONA PISTA DE ATERRIZAJE'}
              </span>
            </motion.div>
          ) : (
            <div className="relative z-10 text-center font-mono text-zinc-500 text-xs">
              <Compass className="w-8 h-8 mx-auto mb-2 opacity-50 animate-spin text-zinc-600" />
              <span>Buscando vector de aproximación aérea...</span>
            </div>
          )}

          {/* Bottom radar status */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-emerald-400/80 bg-black/80 px-2.5 py-1 rounded border border-emerald-500/20">
            <span>RNG: 120 NM</span>
            <span>HDG: {data.runway === 'RWY-13' ? '132° (ILS)' : '215°'}</span>
            <span>FREQ: {data.frequency.toFixed(2)} MHz</span>
            <span>RADAR: {radarActive ? 'TRACKING' : 'STANDBY'}</span>
          </div>
        </div>

        {/* Right Column: 3 Controls */}
        <div className="lg:col-span-6 flex flex-col gap-3.5">
          {/* 1. Destination Selector */}
          <div className="p-3.5 bg-black/60 rounded-xl border border-zinc-700">
            <span className="text-xs font-mono text-zinc-300 block mb-2 font-semibold flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              1. Aeropuerto Destino (ICAO):
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { code: 'MAD', name: 'Madrid' },
                { code: 'BCN', name: 'Barcelona' },
                { code: 'LEMG', name: 'Málaga' },
                { code: 'JFK', name: 'New York' },
              ].map((dest) => (
                <button
                  key={dest.code}
                  id={`dest-btn-${dest.code}`}
                  onClick={() => handleDestinationSelect(dest.code)}
                  className={`py-2 px-1 text-xs font-mono rounded-lg border transition text-center font-bold ${
                    data.destination === dest.code
                      ? dest.code === 'LEMG'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                        : 'bg-amber-600 text-white border-amber-400'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  <div>{dest.code}</div>
                  <div className="text-[9px] font-normal opacity-80">{dest.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Radio Frequency Tuner */}
          <div className="p-3.5 bg-black/60 rounded-xl border border-zinc-700">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-mono text-zinc-300 font-semibold flex items-center gap-1.5">
                <Radio className="w-4 h-4 text-emerald-400" />
                2. Frecuencia VHF Torre de Control:
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                isFreqCorrect
                  ? 'text-emerald-300 bg-emerald-950 border-emerald-500'
                  : 'text-amber-300 bg-amber-950/60 border-amber-500/60'
              }`}>
                {data.frequency.toFixed(2)} MHz
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mt-2">
              <button
                id="freq-down-1"
                onClick={() => handleFreqStep(-1.0)}
                className="py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-mono border border-zinc-700 active:scale-95 transition"
              >
                -1.0
              </button>
              <button
                id="freq-down-01"
                onClick={() => handleFreqStep(-0.05)}
                className="py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-mono border border-zinc-700 active:scale-95 transition"
              >
                -0.05
              </button>
              <button
                id="freq-up-01"
                onClick={() => handleFreqStep(0.05)}
                className="py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-mono border border-zinc-700 active:scale-95 transition"
              >
                +0.05
              </button>
              <button
                id="freq-up-1"
                onClick={() => handleFreqStep(1.0)}
                className="py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg font-mono border border-zinc-700 active:scale-95 transition"
              >
                +1.0
              </button>
            </div>
          </div>

          {/* 3. Runway & Approach Vector Selector (Reimagined without MSFS) */}
          <div className="p-3.5 bg-black/60 rounded-xl border border-zinc-700">
            <span className="text-xs font-mono text-zinc-300 block mb-2 font-semibold flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-emerald-400" />
              3. Pista y Vector de Aproximación Instrumental:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { rwy: 'RWY-31', label: 'Pista 31 (Norte)', desc: 'Sierra' },
                { rwy: 'RWY-04', label: 'Pista 04 (Este)', desc: 'Valle' },
                { rwy: 'RWY-13', label: 'Pista 13 (Costera)', desc: 'Bahía / ILS' },
              ].map((item) => (
                <button
                  key={item.rwy}
                  id={`runway-btn-${item.rwy}`}
                  onClick={() => handleRunwaySelect(item.rwy)}
                  className={`py-2 px-1.5 text-xs font-mono font-bold rounded-lg border transition text-center ${
                    data.runway === item.rwy
                      ? item.rwy === 'RWY-13'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-600/30'
                        : 'bg-amber-600 text-white border-amber-400'
                      : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                >
                  <div>{item.rwy}</div>
                  <div className="text-[9px] font-normal opacity-80">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Completion & Final Reveal Action */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 p-4 bg-emerald-950/70 border-2 border-emerald-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-200 font-mono shadow-xl shadow-emerald-500/20"
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="p-3 bg-emerald-500/30 rounded-xl border border-emerald-400 text-emerald-300 animate-bounce">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-emerald-300">
                ¡VECTOR DE APROXIMACIÓN AÉREA COMPLETADO CON ÉXITO!
              </div>
              <div className="text-xs text-zinc-300 font-sans">
                Ruta fijada hacia LEMG (Málaga) • Frecuencia 124.85 MHz • Aproximación Bahía Pista 13
              </div>
            </div>
          </div>

          {onOpenFinalModal && (
            <button
              id="open-final-reveal-btn"
              onClick={() => {
                playKeyUnlockSound();
                onOpenFinalModal();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm rounded-xl transition shadow-lg shadow-emerald-500/40 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🎉 Ver Destino Final</span>
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
};
