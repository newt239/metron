import { Avatar, Box, Heading, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
// eslint-disable-next-line import/named
import useSWR, { Fetcher } from "swr";

import type { NextPage } from "next";

import { ProfileProps, tokenAtom } from "@/jotai";
const Home: NextPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const token = useAtomValue(tokenAtom);

  const fetcher: Fetcher<ProfileProps, string> = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data);
  const { data, error } = useSWR<ProfileProps, Error>(
    "https://api.spotify.com/v1/me",
    fetcher
  );
  if (error)
    return (
      <div>
        An error has occurred. Please login again.{" "}
        <Link href="/">back to top</Link>
      </div>
    );
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Stack direction="row" alignItems="center">
        <Avatar src={data.images[0].url} />
        <Stack direction="column">
          <Box>
            <Heading as="h2">{data.display_name}</Heading>
          </Box>
          <Box>
            <Text>{data.id}</Text>
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default Home;
