import { Avatar, Box, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useAtomValue } from "jotai";
import Link from "next/link";
import useSWR from "swr";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
import { ProfileProps } from "@/types";

const Profile: NextPage = () => {
  const token = useAtomValue(tokenAtom);

  const fetcher = (url: string) =>
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        return res.data;
      });
  const { data: profile, error: getProfileError } = useSWR<ProfileProps, Error>(
    "https://api.spotify.com/v1/me",
    fetcher
  );

  return (
    <Box p={3}>
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
    </Box>
  );
};

export default Profile;
