/* eslint-disable @next/next/no-img-element */

import dayjs from "dayjs";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { spotifyClient } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { AudioInfoProps, TrackProps } from "@/types/spotify";

const features = [
  ["loudness", "音量・音圧（db）の平均値"],
  ["acousticness", "アコースティック感"],
  ["danceabillty", "踊りやすさ"],
  ["energy", "曲の過激さ"],
  ["instrumentalness", "インストっぽさ"],
  ["liveness", "ライブっぽさ"],
  ["speechiness", "スピーチ感"],
  ["valence", "明るさ"],
];

export default async function TrackPage({
  params,
}: {
  params: { id: string };
}) {
  const track = await spotifyClient<TrackProps>(`tracks/${params.id}`);
  const audio = await spotifyClient<AudioInfoProps>(
    `audio-features/${params.id}`
  );

  if (!track) return null;

  return (
    <div>
      <div>
        <div className={cn("flex", "gap-3", "p-3", "flex-col", "md:flex-row")}>
          <div className={cn("w-full", "min-w-[200px]", "md:w-1/3")}>
            <img
              alt={`album art of ${track.name}`}
              className={cn("rounded-lg")}
              src={track.album.images[0].url}
            />
          </div>
          <div className={cn("grow")}>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              {track.name}
            </h2>
            <p>{track.artists.map((a) => a.name).join("")}</p>
            {track.preview_url && (
              <div className={cn("my-3")}>
                <audio
                  controls
                  src={track.preview_url}
                  style={{ width: "100%" }}
                />
              </div>
            )}
            <Table>
              <TableBody>
                <TableRow>
                  <TableHead className="font-medium">Length</TableHead>
                  <TableCell className="text-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                      {dayjs(track.duration_ms).format("mm:ss")}
                    </span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-medium">Popularity</TableHead>
                  <TableCell className="text-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                      {track.popularity}
                    </span>{" "}
                    / 100
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableHead className="font-medium">Release</TableHead>
                  <TableCell className="text-right">
                    <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                      {dayjs(track.album.release_date).format("YYYY/MM/DD")}
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className={cn("w-full", "text-center")}>
              <a
                href={track.external_urls.spotify}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button variant="link">Play on Spotify</Button>
              </a>
            </div>
          </div>
        </div>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Audio Infomation
        </h3>
        {audio && (
          <Table>
            <TableBody>
              {features.map((feature) => (
                <TableRow key={feature[0]}>
                  <TableHead className="font-medium">{feature[0]}</TableHead>
                  <TableCell className="text-right">
                    {audio[feature[0] as keyof AudioInfoProps]}
                  </TableCell>
                  <TableCell>{feature[1]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
