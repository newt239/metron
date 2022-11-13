import { Container } from "@chakra-ui/react";

import type { NextPage } from "next";

import Profile from "@/components/elements/Profile";
import TopTracks from "@/components/elements/TopTracks";

const Me: NextPage = () => {
  return (
    <Container maxW="1200px" sx={{ py: "5rem" }}>
      <Profile />
      <TopTracks />
    </Container>
  );
};

export default Me;
