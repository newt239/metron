import {
  Container,
  Heading,
  List,
  ListItem,
  Link,
  Box,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import NextLink from "next/link";

import LoginButton from "../elements/LoginButton";

import type { NextPage } from "next";

import { tokenAtom } from "@/jotai";
const Sidebar: NextPage = () => {
  const token = useAtomValue(tokenAtom);
  return (
    <Box>
      {token ? (
        <List>
          <ListItem>
            <NextLink href="/me" scroll={false}>
              <Link>My Top Tracks</Link>
            </NextLink>
          </ListItem>
          <ListItem>
            <NextLink href="/search" scroll={false}>
              <Link>Search</Link>
            </NextLink>
          </ListItem>
        </List>
      ) : (
        <LoginButton />
      )}
    </Box>
  );
};

export default Sidebar;
