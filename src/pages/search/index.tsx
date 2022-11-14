import { useState } from "react";

import { Container, Input, ListItem, UnorderedList } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Head from "next/head";

import type { NextPage } from "next";

import Layout from "@/components/layout";
import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const Search: NextPage = () => {
  const token = useAtomValue(tokenAtom);
  const [text, setText] = useState<string>("");
  const [trackList, setTrackList] = useState<TrackProps[]>([]);
  const searchTracks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prompt = event.target.value;
    setText(prompt);
    const url = `https://api.spotify.com/v1/search?type=track&q=${prompt}&market=JP`;
    axios
      .get<{ tracks: { items: TrackProps[] } }>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTrackList(response.data.tracks.items);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Head>
        <title>楽曲検索 - metron</title>
      </Head>
      <Layout>
        <Container maxW="1200px" sx={{ py: "5rem" }}>
          <Input
            placeholder="夜に駆ける"
            value={text}
            onChange={searchTracks}
          />
          <UnorderedList>
            {trackList.map((track) => {
              return <ListItem key={track.id}>{track.name}</ListItem>;
            })}
          </UnorderedList>
        </Container>
      </Layout>
    </>
  );
};

export default Search;
