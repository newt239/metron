import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

import Layout from "@/layout";
import theme from "@/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
