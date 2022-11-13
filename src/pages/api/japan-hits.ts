// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

import type { NextApiRequest, NextApiResponse } from "next";

type SpotifyAuthApiResponse = {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
};

type Data = {
  name: string;
}[];

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const token = Buffer.from(
    `${process.env.NEXT_PUBLIC_API_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    "utf-8"
  ).toString("base64");
  const authRes = await axios.post<SpotifyAuthApiResponse>(
    "https://accounts.spotify.com/api/token",
    {
      grant_type: "refresh_token",
      refresh_token: process.env.REFRESH_TOKEN,
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${token}`,
      },
    }
  );
  const japanHitsRes = await axios.get(
    "https://api.spotify.com/v1/playlists/37i9dQZF1DXayDMsJG9ZBv/tracks",
    {
      headers: {
        Authorization: `Bearer ${authRes.data.access_token}`,
      },
    }
  );
  const japanHits = japanHitsRes.data.items.map(
    (item: { track: object }) => item.track
  );
  res.status(200).json(japanHits);
};

export default handler;
