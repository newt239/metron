import { Container } from "@chakra-ui/react";

import type { NextPage } from "next";

import Profile from "@/components/elements/Profile";
import TopTracks from "@/components/elements/TopTracks";
import Layout from "@/components/layout";

const Me: NextPage = () => {
  return (
    <Layout>
      <Container maxW="1200px" sx={{ py: "5rem" }}>
        <Profile />
        <TopTracks />
      </Container>
    </Layout>
  );
};

export default Me;
