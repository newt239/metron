import { Container } from "@chakra-ui/react";
import Head from "next/head";

import type { NextPage, NextPageWithLayout } from "next";

import Profile from "@/components/elements/Profile";
import UserTopTracks from "@/components/elements/UserTopTracks";
import Layout from "@/components/layout/Layout";

const Me: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>マイトップトラック - metron</title>
      </Head>
      <Container maxW="1200px">
        <Profile />
        <UserTopTracks />
      </Container>
    </>
  );
};
Me.getLayout = (page) => <Layout>{page}</Layout>;
export default Me;
