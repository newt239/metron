import { atom } from "jotai";

export const tokenAtom = atom<null | string>(null);

interface PlayerStateProps {
  isPlaying: boolean;
  source: string;
  music: HTMLAudioElement | null;
}
export const playerStateAtom = atom<PlayerStateProps | null>(null);
