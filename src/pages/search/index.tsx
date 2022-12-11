import { useState } from "react";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Input,
  Link,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Head from "next/head";
import NextLink from "next/link";

import type { NextPageWithLayout } from "next";

import MusicPreview from "@/components/elements/MusicPreview";
import Layout from "@/components/layout/Layout";
import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const Search: NextPageWithLayout = () => {
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
      <Container maxW="1200px">
        <Heading as="h2">Search tracks</Heading>
        <Input
          placeholder="夜に駆ける"
          value={text}
          onChange={searchTracks}
          sx={{ my: 3 }}
        />
        <Flex
          sx={{
            flexDirection: "column",
            maxWidth: 300,
            gap: 3,
          }}
        >
          {trackList.map((track) => {
            return (
              <Flex
                key={track.id}
                sx={{
                  flexDirection: "row",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    width: "min(150px, 50%)",
                    position: "relative",
                    flexGrow: 1,
                  }}
                >
                  <Image
                    src={track.album.images[0].url}
                    alt={`album art of ${track.name}`}
                    style={{ width: "100%", borderRadius: 5 }}
                  />
                  {track.preview_url && (
                    <Box
                      sx={{
                        fontSize: "2rem",
                        fontWeight: 800,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translateY(-50%) translateX(-50%)",
                        mixBlendMode: "difference",
                        opacity: 0,
                        transition: "all 0.5s",
                        cursor: "pointer",
                      }}
                      _hover={{
                        opacity: 1,
                      }}
                    >
                      <MusicPreview source={track.preview_url} />
                    </Box>
                  )}
                </Box>
                <Box
                  sx={{
                    width: "min(150px, 50%)",
                    flexGrow: 1,
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      overflowY: "scroll",
                    }}
                  >
                    <Heading as="h4" size="md">
                      <NextLink href={`/track/${track.id}`} scroll={false}>
                        <Link>{track.name}</Link>
                      </NextLink>
                    </Heading>
                    <Text>
                      {track.artists
                        .map<React.ReactNode>((artist) => (
                          <NextLink
                            key={artist.id}
                            href={`/artist/${artist.id}`}
                            scroll={false}
                          >
                            <Link>{artist.name}</Link>
                          </NextLink>
                        ))
                        .reduce((prev, curr) => [prev, ", ", curr])}
                    </Text>
                  </Box>
                </Box>
              </Flex>
            );
          })}
        </Flex>
      </Container>
    </>
  );
};

Search.getLayout = (page) => <Layout>{page}</Layout>;

export default Search;
