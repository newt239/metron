import { Container, Heading } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";

import type { NextPage } from "next";
const Header: NextPage = () => {
  return (
    <chakra.header
      width="100%"
      position="fixed"
      top={0}
      left="auto"
      right={0}
      p={3}
      backdropFilter="blur(20px)"
      backgroundColor="rgba(33, 33, 33, 0.7)"
      zIndex={1000}
    >
      <Link href="/" scroll={false}>
        <Container maxW={1200}>
          <Heading as="h1" cursor="pointer">
            stream
          </Heading>
        </Container>
      </Link>
    </chakra.header>
  );
};

export default Header;
