import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Link from "next/link";
import useSWR from "swr";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const TopTracks: NextPage = () => {
  const token = useAtomValue(tokenAtom);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        return res.data.items;
      });
  const { data: topTracks, error: getTopTracksError } = useSWR<
    TrackProps[],
    Error
  >("https://api.spotify.com/v1/me/top/tracks", fetcher);

  if (getTopTracksError) return <div>error</div>;
  if (!topTracks) return <div>5Loading...</div>;

  return (
    <div>
      <Heading as="h2">Top Tracks</Heading>
      <Flex flexWrap="wrap" p={3} gap={5}>
        {topTracks.map((track) => (
          <Flex
            key={track.id}
            direction="row"
            width="max(30%, 300px)"
            gap={3}
            flexGrow={1}
          >
            <Box width="min(150px, 50%)" flexGrow={1}>
              <Image
                src={track.album.images[0].url}
                alt={`album art of ${track.name}`}
                width="100%"
                height="100%"
                borderRadius={15}
                filter="drop-shadow(2px 4px 6px black)"
              />
            </Box>
            <Box width="min(150px, 50%)" flexGrow={1}>
              <Heading as="h4" size="md">
                <Link href={`/track/${track.id}`} scroll={false}>
                  {track.name}
                </Link>
              </Heading>
              <Text>
                {track.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </Box>
          </Flex>
        ))}
        {topTracks.length % 3 >= 1 && <Flex width="max(30vw, 300px)" />}
        {topTracks.length % 3 >= 2 && <Flex width="max(30vw, 300px)" />}
      </Flex>
    </div>
  );
};

export default TopTracks;
