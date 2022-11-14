import { Box, Button } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import Head from "next/head";
import Link from "next/link";

import type { NextPage } from "next";

import JapanHits from "@/components/elements/JapanHits";
import LoginButton from "@/components/elements/LoginButton";
import Layout from "@/components/layout";
import { tokenAtom } from "@/jotai";

const Home: NextPage = () => {
  const token = useAtomValue(tokenAtom);
  return (
    <div>
      <Head>
        <title>metron</title>
        <meta name="description" content="Check your Activity on Spotify." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <Box
            sx={{
              zIndex: 10,
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            <Box
              sx={{
                py: 10,
                fontSize: "3rem",
                fontWeight: 800,
                textAlign: "center",
                textShadow: "2px 4px 6px black",
              }}
            >
              Check your Activity on{" "}
              <span
                style={{
                  color: "#1DB954",
                }}
              >
                Spotify
              </span>
              .
            </Box>
            <Box textAlign="center">
              {token ? (
                <Link href="/me" scroll={false}>
                  <Button
                    variant="outline"
                    colorScheme="green"
                    as="a"
                    cursor="pointer"
                  >
                    Check my room
                  </Button>
                </Link>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Box>
          <Box zIndex={-1}>
            <JapanHits />
          </Box>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
