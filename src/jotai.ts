import { atom } from "jotai";

export const tokenAtom = atom<null | string>(null);

type PropfileProps = {
  id: string;
  display_name: string;
  images: { url: string }[];
  country: string;
  type: "user";
};

export const profileAtom = atom<null | PropfileProps>(null);
