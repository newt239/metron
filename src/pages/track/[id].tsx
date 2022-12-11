import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import type { NextPage, NextPageWithLayout } from "next";

import AudioInfo from "@/components/elements/AudioInfo";
import RelatedTracks from "@/components/elements/RelatedTracks";
import TrackInfo from "@/components/elements/TrackInfo";
import Layout from "@/components/layout/Layout";
import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const Track: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;
  const token = useAtomValue(tokenAtom);
  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        return res.data;
      });
  const { data: track, error } = useSWR<TrackProps, Error>(
    `https://api.spotify.com/v1/tracks/${id}`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>{track ? track.name : "楽曲情報"} - metron</title>
      </Head>
      <Container maxW="1200px">
        {error ? (
          <div>{error.message}</div>
        ) : !track ? (
          <div>Loading...</div>
        ) : (
          <>
            <TrackInfo track={track} />
            <AudioInfo id={track.id} />
            <RelatedTracks
              id={track.id}
              artists={track.artists.map((artist) => artist.id)}
            />
          </>
        )}
      </Container>
    </>
  );
};
Track.getLayout = (page) => <Layout>{page}</Layout>;
export default Track;
