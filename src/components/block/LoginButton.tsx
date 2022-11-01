import { Button } from "@chakra-ui/react";
import Head from "next/head";

import type { NextPage } from "next";
const LoginButton: NextPage = () => {
  const login = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${
      process.env.NEXT_PUBLIC_API_SPOTIFY_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_API_SPOTIFY_REDIRECT_URI || ""
    )}&scope=${encodeURIComponent(
      process.env.NEXT_PUBLIC_API_SPOTIFY_SCOPES || ""
    )}&response_type=token&state=xxxxxxxxxxxxxxxx&show_dialog=true`;
    const popup = window.open(
      url,
      "Login with Spotify",
      "width=600,height=800"
    );
    const checkAuth = window.setInterval(() => {
      if (popup) {
        try {
          if (!popup || popup.closed !== false) {
            popup.close();
            clearInterval(checkAuth);
          }
          if (popup.location.href) {
            console.log(popup.location.href);
            popup.close();
            clearInterval(checkAuth);
          }
        } catch (error) {
          /*
           * Ignore DOMException: Blocked a frame with origin from accessing a
           * cross-origin frame.
           */
        }
      }
    }, 500);
  };
  return (
    <Button onClick={login} colorScheme="green">
      sign in with spotify
    </Button>
  );
};

export default LoginButton;
