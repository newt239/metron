import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { SWRConfig } from "swr";

import type { AppPropsWithLayout } from "next/app";

import theme from "@/theme";

const MyApp = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ChakraProvider theme={theme}>
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          {getLayout(<Component key={router.asPath} {...pageProps} />)}
        </SWRConfig>
      </AnimatePresence>
    </ChakraProvider>
  );
};

MyApp.getInitialProps = async () => ({ pageProps: {} });
export default MyApp;
