import { Container } from "@chakra-ui/react";
import Head from "next/head";

import type { NextPage } from "next";

import Profile from "@/components/elements/Profile";
import UserTopTracks from "@/components/elements/UserTopTracks";
import Layout from "@/components/layout";

const Me: NextPage = () => {
  return (
    <>
      <Head>
        <title>マイトップトラック - Spotificater</title>
      </Head>
      <Layout>
        <Container maxW="1200px" sx={{ py: "5rem" }}>
          <Profile />
          <UserTopTracks />
        </Container>
      </Layout>
    </>
  );
};

export default Me;
