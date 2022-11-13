import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "#fff",
        background: "#212121",
      },
    },
  },
});

export default theme;
