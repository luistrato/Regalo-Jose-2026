export type GamePhase = 'phase1_office' | 'phase2_radar';

export interface ClueState {
  nuclearKey: boolean;
  vandelayKey: boolean;
  radarKey: boolean;
}

export interface QuoteModalData {
  isOpen: boolean;
  character: 'Homer' | 'George' | 'Kramer' | 'Burns' | 'Flanders' | 'SoupNazi' | 'Bart';
  quote: string;
  source: 'Los Simpson (España)' | 'Seinfeld';
  emoji: string;
  soundType?: 'buzz' | 'homer' | 'serenity' | 'klaxon' | 'click' | 'chime';
}

export interface RadarData {
  frequency: number; // target: 124.85
  destination: string; // target: 'LEMG'
  runway: string; // target: 'RWY-13' (Aproximación Bahía de Málaga)
}

export interface NuclearConsoleData {
  rod1: number; // 0-9 (target 7)
  rod2: number; // 0-9 (target 4)
  rod3: number; // 0-9 (target 2)
  passwordInput: string; // target "MORDISCOS" or "CUCA"
}

export interface VandelayData {
  donutClicks: number;
  pretzelClicks: number;
  safeCode: string; // target "LATEX"
  selectedRole: string; // 'latex'
}

