export interface Note {
  id: string;
  author: string;
  content: string;
  ornament: string; // Emoji
  timestamp: number;
  x: number; // Percentage 0-100 (horizontal position)
  y: number; // Percentage 0-100 (vertical position)
  layerIndex?: number; // Legacy: Which layer of the CSS tree this belongs to
}

export const ORNAMENTS = [
  '🔴', '🔵', '🟡', '🟣', '🟠', 
  '⭐', '🌟', '🎄', '🎁', '🎀',
  '🔔', '🕯️', '🍪', '🥛', '🎅',
  '🦌', '🧦', '❄️', '⛄', '🧤'
];

export enum ViewMode {
  NORMAL = 'NORMAL',
  PREVIEW = 'PREVIEW',
  LIST = 'LIST',
  ADMIN_LOGIN = 'ADMIN_LOGIN',
  ADMIN_PANEL = 'ADMIN_PANEL',
}