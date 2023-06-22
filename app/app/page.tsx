/* eslint-disable @next/next/no-img-element */

import { spotifyClient } from "@/lib/spotify";
import { TrackProps } from "@/types/spotify";

export const revalidate = 0;

export default async function AppPage() {
  const myTopTracks = await spotifyClient<{ items: TrackProps[] }>(
    "me/top/tracks"
  );

  if (!myTopTracks) return null;

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Your Top Tracks
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myTopTracks.items.map((track) => (
          <div key={track.id}>
            <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
              <div className="shrink-0">
                <a href={`app/track/${track.id}`}>
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
