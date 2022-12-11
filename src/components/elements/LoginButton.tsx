import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useSetAtom } from "jotai";
import Router from "next/router";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";

const LoginButton: NextPage = () => {
  const setToken = useSetAtom(tokenAtom);

  const login = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${
      process.env.NEXT_PUBLIC_API_SPOTIFY_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      location.href
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
            const token = popup.location.href.split(/\=|\&/)[1];
            setToken(token);
            getUserProfile(token);
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

    const getUserProfile = (token: string) => {
      axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          Router.push(`/me`);
        });
    };
  };
  return (
    <Button onClick={login} colorScheme="green" sx={{ mt: 2 }}>
      Sign in with Spotify
    </Button>
  );
};

export default LoginButton;
