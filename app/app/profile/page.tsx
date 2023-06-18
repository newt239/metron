/* eslint-disable @next/next/no-img-element */
import { cookies } from "next/headers";

import { TrackProps } from "@/types/spotify";

const ProfilePage: React.FC = async () => {
  const tokenCookie = cookies().get("spotify_token");
  if (!tokenCookie) return null;
  const myTopTracks: { items: TrackProps[] } = await fetch(
    "https://api.spotify.com/v1/me/top/tracks",
    {
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    }
  ).then((res) => res.json());

  console.log(myTopTracks);

  return (
    <div>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Profile
      </h2>
      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Top Tracks
        </h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {myTopTracks.items.map((track) => (
            <div key={track.id}>
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="shrink-0">
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src={track.album.images[0].url}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
