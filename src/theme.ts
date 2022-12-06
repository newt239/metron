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
    "*": {
      WebkitBoxSizing: "border-box",
      MozBoxSizing: "border-box",
      boxSizing: "border-box",
      "&::-webkit-scrollbar": { width: ".3rem", height: ".3rem" },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#fff",
        borderRadius: ".1rem",
      },
    },
    "html, body": {
      color: "#fff",
      background: "#212121",
      scrollbarGutter: "stable",
    },
  },
};

const theme = extendTheme({
  config,
  breakpoints,
  styles,
});

export default theme;
