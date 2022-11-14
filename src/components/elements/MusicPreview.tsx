import { useAtom } from "jotai";

import type { NextPage } from "next";

import { playerStateAtom } from "@/jotai";

const MusicPreview: NextPage<{ source: string }> = ({ source }) => {
  const [playerState, setPlayerState] = useAtom(playerStateAtom);

  const changePlayerState = () => {
    if (source) {
      const normalPlayAction = () => {
        const music = new Audio(source);
        music.play();
        setPlayerState({
          isPlaying: true,
          source: source,
          music: music,
        });
      };
      if (!playerState || !playerState.music) {
        normalPlayAction();
      } else {
        playerState.music.pause();
        if (!playerState.isPlaying) {
          if (playerState.source != source) {
            normalPlayAction();
          } else {
            playerState.music.play();
            setPlayerState({ ...playerState, isPlaying: true });
          }
        } else if (playerState.source != source) {
          normalPlayAction();
        } else {
          setPlayerState({ ...playerState, isPlaying: false });
        }
      }
    }
  };
  return (
    <div onClick={changePlayerState}>
      {!playerState
        ? "PLAY"
        : playerState.isPlaying
        ? playerState.source == source
          ? "PAUSE"
          : "PLAY"
        : "PLAY"}
    </div>
  );
};

export default MusicPreview;
