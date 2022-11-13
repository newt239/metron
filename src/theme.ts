import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
const breakpoints = {
  xs: "0px",
  sm: "600px",
  md: "900px",
  lg: "1200px",
  xl: "1536px",
};

const styles = {
  global: {
    "html, body": {
      color: "#fff",
      background: "#212121",
    },
  },
};

const theme = extendTheme({
  config,
  breakpoints,
  styles,
});

export default theme;
