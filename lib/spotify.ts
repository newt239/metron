import { cookies } from "next/headers";

export async function spotifyClient<T>(
  url: string,
  method: "GET" | "POST" = "GET"
) {
  const tokenCookie = cookies().get("spotify_token");
  if (!tokenCookie) return null;
  let errorFlag = false;
  const result: T = await fetch(`https://api.spotify.com/v1/${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
    next: {
      revalidate: 0,
    },
  })
    .then((res) => {
      const json = res.json();
      return json;
    })
    .catch((err) => {
      errorFlag = true;
      console.log(err);
    });
  console.log(result);
  if (errorFlag) return null;
  return result;
}
