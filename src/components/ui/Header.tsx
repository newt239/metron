import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import Link from "next/link";

import Sidebar from "./Sidebar";

import type { NextPage } from "next";
const Header: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <chakra.header
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        left: "auto",
        p: 3,
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(33, 33, 33, 0.7)",
        zIndex: 10,
      }}
    >
      <Container maxW={1200}>
        <Flex sx={{ flexDirection: "row", gap: "1rem" }}>
          <IconButton
            variant="outline"
            colorScheme="teal"
            aria-label="open drawer"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
          <Link href="/" scroll={false}>
            <Heading as="h1" cursor="pointer">
              metron
            </Heading>
          </Link>
        </Flex>
      </Container>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>metron</DrawerHeader>
          <DrawerBody>
            <Sidebar />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </chakra.header>
  );
};

export default Header;
