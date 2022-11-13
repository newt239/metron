import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import App from "next/app";
import { SWRConfig } from "swr";

import type { AppProps } from "next/app";

import theme from "@/theme";

const MyApp = ({ Component, pageProps, router }: AppProps) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <ChakraProvider theme={theme}>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Component key={router.asPath} {...pageProps} />
        </AnimatePresence>
      </ChakraProvider>
    </SWRConfig>
  );
};

MyApp.getInitialProps = async () => ({ pageProps: {} });
export default MyApp;
