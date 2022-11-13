import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
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
import moment from "moment";

import type { NextPage } from "next";

import { TrackProps } from "@/types";

const TrackInfo: NextPage<{ track: TrackProps }> = ({ track }) => {
  return (
    <Box>
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
          <Text>{track.artists.map((artist) => artist.name).join(", ")}</Text>
          {track.preview_url && (
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <audio
                controls
                src={track.preview_url}
                style={{ width: "100%" }}
              />
            </Box>
          )}
          <TableContainer mt={2}>
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
          <Box sx={{ mt: 3, textAlign: "center" }}>
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
    </Box>
  );
};

export default TrackInfo;
