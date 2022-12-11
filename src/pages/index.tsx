import { Box, Heading, Link } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Head from "next/head";
import NextLink from "next/link";

import type { NextPageWithLayout } from "next";

import JapanHits from "@/components/elements/JapanHits";
import LoginButton from "@/components/elements/LoginButton";
import Layout from "@/components/layout/Layout";
import { tokenAtom } from "@/jotai";
const Home: NextPageWithLayout = () => {
  const token = useAtomValue(tokenAtom);
  return (
    <div>
      <Head>
        <title>metron</title>
        <meta name="description" content="Check your Activity on Spotify." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading as="h2">Check your Spotify acticity</Heading>
      {token ? (
        <Box sx={{ my: 5 }}>
          <NextLink href="/me" scroll={false}>
            <Link>Check!</Link>
          </NextLink>
        </Box>
      ) : (
        <LoginButton />
      )}
      <Heading as="h2">Japan Hits</Heading>
      <JapanHits />
    </div>
  );
};

Home.getLayout = (page) => <Layout>{page}</Layout>;
export default Home;
