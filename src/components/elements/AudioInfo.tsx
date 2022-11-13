import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import useSWR from "swr";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
import { AudioInfoProps } from "@/types";

const AudioInfo: NextPage<{ id: string }> = ({ id }) => {
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
  const { data: audio, error } = useSWR<AudioInfoProps, Error>(
    `https://api.spotify.com/v1/audio-features/${id}`,
    fetcher
  );
  if (!audio) return <div>error</div>;
  if (error) return <div>error error</div>;

  const features = [
    ["loudness", "音量・音圧（db）の平均値"],
    ["acousticness", "アコースティック感"],
    ["danceabillty", "踊りやすさ"],
    ["energy", "曲の過激さ"],
    ["instrumentalness", "インストっぽさ"],
    ["liveness", "ライブっぽさ"],
    ["speechiness", "スピーチ感"],
    ["valence", "明るさ"],
  ];
  return (
    <Box>
      <Heading as="h3">Audio Information</Heading>
      <TableContainer my={2}>
        <Table variant="simple">
          <Tbody>
            {features.map((feature) => (
              <Tr key={feature[0]}>
                <Th>{feature[0]}</Th>
                <Td isNumeric>{audio[feature[0] as keyof AudioInfoProps]}</Td>
                <Td>{feature[1]}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AudioInfo;
