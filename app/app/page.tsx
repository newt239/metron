/* eslint-disable @next/next/no-img-element */

import { spotifyClient } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { PlaybackState, TrackProps } from "@/types/spotify";

export default async function AppPage() {
  const playbackState = await spotifyClient<PlaybackState>("me/player");
  const myTopTracks = await spotifyClient<{ items: TrackProps[] }>(
    "me/top/tracks"
  );

  if (!playbackState || !myTopTracks) return null;

  return (
    <div>
      {playbackState.is_playing && playbackState.item && (
        <>
          <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Now Playing
          </h2>
          <div className={cn("flex", "mt-6", "gap-4")}>
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="shrink-0">
                <a
                  href={playbackState.item.external_urls.spotify}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    alt=""
                    className="h-auto w-[min(30vh,30vw)] object-cover"
                    src={playbackState.item.album.images[0].url}
                  />
                </a>
              </div>
            </div>
            <div className={cn("grow", "flex", "flex-col", "justify-between")}>
              <div className={cn("grow")}>
                <h3 className="scroll-m-20 text-4xl font-semibold tracking-tight">
                  {playbackState.item.name}
                </h3>
                <p className="leading-7">
                  {playbackState.item.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </p>
              </div>
              <p>{playbackState.device.name}で再生</p>
            </div>
          </div>
        </>
      )}
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Your Top Tracks
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myTopTracks.items.map((track) => (
          <div key={track.id}>
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="shrink-0">
                <a
                  href={track.external_urls.spotify}
                  rel="noreferrer"
                  target="_blank"
                >
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src={track.album.images[0].url}
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
