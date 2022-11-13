import { Avatar, Box, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
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
  const { data: profile, error: getProfileError } = useSWR<ProfileProps, Error>(
    "https://api.spotify.com/v1/me",
    fetcher
  );

  return (
    <div>
      {getProfileError ? (
        <div>
          An error has occurred. Please login again.{" "}
          <Link href="/">back to top</Link>
        </div>
      ) : (
        <Stack direction="row" alignItems="center">
          <Avatar src={profile ? profile.images[0].url : undefined} size="xl" />
          <Stack direction="column">
            <Box>
              {!!profile ? (
                <Heading as="h2">{profile.display_name}</Heading>
              ) : (
                <Skeleton />
              )}
            </Box>
            <Box>{!!profile ? <Text>{profile.id}</Text> : <Skeleton />}</Box>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default Home;
