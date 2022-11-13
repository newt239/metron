import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import useSWR from "swr";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
import { TopTracksProps } from "@/types";

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
    TopTracksProps,
    Error
  >("https://api.spotify.com/v1/me/top/tracks", fetcher);
  if (!topTracks) return <div>error</div>;
  if (getTopTracksError) return <div>error error</div>;

  return (
    <div>
      <Heading as="h2">Top Tracks</Heading>
      <Flex flexWrap="wrap" p={3} gap={5}>
        {topTracks.map((track) => (
          <Flex
            key={track.id}
            direction="row"
            width="max(30vw, 300px)"
            gap={3}
            flexGrow={1}
          >
            <Box width="min(150px, 50vw)" flexGrow={1}>
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
                <Link href={track.external_urls.spotify} target="_blank">
                  {track.name}
                </Link>
              </Heading>
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
