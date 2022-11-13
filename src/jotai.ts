import { atom } from "jotai";

export const tokenAtom = atom<null | string>(null);

export type ProfileProps = {
  id: string;
  display_name: string;
  images: { url: string }[];
  country: string;
  type: "user";
};

export const profileAtom = atom<null | ProfileProps>(null);
