import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import Image from "next/image";
import useSWR from "swr";

import type { NextPage } from "next";

import { JapanHitsProps } from "@/types";

const JapanHits: NextPage = () => {
  const fetcher = (url: string) =>
    axios.get(url).then((res) => {
      console.log(res.data);
      return res.data;
    });
  const { data: japanHits, error } = useSWR<JapanHitsProps, Error>(
    "/api/japan-hits",
    fetcher
  );
  if (!japanHits) return <div>error</div>;
  if (error) return <div>error error</div>;

  return (
    <Box opacity={0.5} position="fixed" top={0} left="auto" right={0}>
      <Flex flexWrap="wrap" p={3} gap={3} justifyContent="center">
        {japanHits.map((track) => {
          return (
            <Box key={track.id}>
              <Image
                src={track.album.images[0].url}
                alt={track.name}
                width={150}
                height={150}
              />
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
};

export default JapanHits;
