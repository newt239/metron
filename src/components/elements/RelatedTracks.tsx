import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Link from "next/link";
import useSWR from "swr";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const RelatedTracks: NextPage<{ id: string; artists: string[] }> = ({
  id,
  artists,
}) => {
  const token = useAtomValue(tokenAtom);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data.tracks);
        return res.data.tracks;
      });
  const { data: relatedTracks, error } = useSWR<TrackProps[], Error>(
    `https://api.spotify.com/v1/recommendations?seed_tracks=${id}&seed_artists=${artists.join(
      ","
    )}`,
    fetcher
  );

  return (
    <Box>
      <Heading as="h3">Recommendation</Heading>
      {error ? (
        <div>{error.message}</div>
      ) : !relatedTracks ? (
        <div>Loading...</div>
      ) : (
        <Flex flexWrap="wrap" p={3} gap={5}>
          {relatedTracks.map((track) => (
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
          {relatedTracks.length % 3 >= 1 && (
            <Flex width="max(30%, 300px)" gap={3} flexGrow={1} />
          )}
          {relatedTracks.length % 3 >= 2 && (
            <Flex width="max(30%, 300px)" gap={3} flexGrow={1} />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default RelatedTracks;
