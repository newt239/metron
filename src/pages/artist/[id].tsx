import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import type { NextPageWithLayout } from "next";

import ArtistInfo from "@/components/elements/ArtistInfo";
import ArtistTopTracks from "@/components/elements/ArtistTopTracks";
import Layout from "@/components/layout/Layout";
import { tokenAtom } from "@/jotai";
import { ArtistProps } from "@/types";

const Artist: NextPageWithLayout = () => {
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
  const { data: artist, error } = useSWR<ArtistProps, Error>(
    `https://api.spotify.com/v1/artists/${id}`,
    fetcher
  );

  return (
    <>
      <Head>
        <title>{artist ? artist.name : "アーティスト情報"} - metron</title>
      </Head>
      <Container maxW="1200px">
        {error ? (
          <div>{error.message}</div>
        ) : !artist ? (
          <div>Loading...</div>
        ) : (
          <>
            <ArtistInfo artist={artist} />
            <ArtistTopTracks id={artist.id} />
          </>
        )}
      </Container>
    </>
  );
};
Artist.getLayout = (page) => <Layout>{page}</Layout>;
export default Artist;
