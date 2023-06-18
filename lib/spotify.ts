import { cookies } from "next/headers";

export async function spotifyClient<T>(
  url: string,
  method: "GET" | "POST" = "GET"
) {
  const tokenCookie = cookies().get("spotify_token");
  if (!tokenCookie) return null;
  const result: T = await fetch(`https://api.spotify.com/v1/${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  }).then((res) => res.json());
  return result;
}
