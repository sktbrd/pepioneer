import { extendTheme } from "@chakra-ui/react";

import { config } from "./config";

export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "Courier New, monospace",
    body: "Courier New, monospace",
  },
  components: {
    // Button: {
    // }
  },
  styles: {
    global: (props) => ({
      body: {
        backgroundColor: "black",
        color: props.colorMode === "dark" ? "white" : "black",
      },
      p: {
        color: "limegreen",
      },
    }),
  },
  config,
});
