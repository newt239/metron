import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import moment from "moment";
import { useRouter } from "next/router";
import useSWR from "swr";

import type { NextPage } from "next";

import Layout from "@/components/layout";
import { tokenAtom } from "@/jotai";
import { TrackProps } from "@/types";

const Track: NextPage = () => {
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
  if (!track) return <div>error</div>;
  if (error) return <div>error error</div>;
  return (
    <Layout>
      <Container maxW="1200px" sx={{ py: "5rem" }}>
        <Flex flexWrap="wrap" sx={{ justifyContent: "center", p: 5, gap: 5 }}>
          <Box width={{ xs: "100%", sm: "clamp(30%, 250px, 50%)" }}>
            <Image
              src={track.album.images[0].url}
              alt={`album art of ${track.name}`}
              borderRadius={15}
              filter="drop-shadow(2px 4px 6px black)"
            />
          </Box>
          <Box>
            <Heading as="h2">{track.name}</Heading>
            <Text>{track.id}</Text>
            <TableContainer my={2}>
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Th>Length</Th>
                    <Td isNumeric>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                        {moment.utc(track.duration_ms).format("mm:ss")}
                      </span>
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Popularity</Th>
                    <Td isNumeric>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                        {track.popularity}
                      </span>{" "}
                      / 100
                    </Td>
                  </Tr>
                  <Tr>
                    <Th>Release</Th>
                    <Td isNumeric>
                      <span style={{ fontSize: "1.5rem", fontWeight: 800 }}>
                        {moment(track.album.release_date).format("YYYY/MM/DD")}
                      </span>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 3, textAlign: "center" }}>
              <a
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  colorScheme="teal"
                  variant="link"
                  rightIcon={<ExternalLinkIcon mx={1} />}
                >
                  Play on Spotify
                </Button>
              </a>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Layout>
  );
};

export default Track;
