import { ReactElement } from "react";

import { Box, Container } from "@chakra-ui/react";
import { motion } from "framer-motion";

import Header from "../ui/Header";

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxW={1200}>{children}</Container>
    </motion.div>
  </>
);
export default Layout;
