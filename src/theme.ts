import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
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
  styles,
});

export default theme;
