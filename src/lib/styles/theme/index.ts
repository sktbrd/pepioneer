import { extendTheme } from "@chakra-ui/react";

type GlobalStyleProps = { colorMode: "light" | "dark" };

const themeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  ...themeConfig,
  fonts: {
    heading: "Courier New, monospace",
    body: "Courier New, monospace",
  },
  components: {},
  styles: {
    global: (props: GlobalStyleProps) => ({
      body: {
        backgroundColor: "black",
        color: props.colorMode === "dark" ? "white" : "black",
        cursor: 'url("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcreazilla-store.fra1.digitaloceanspaces.com%2Femojis%2F58271%2Fskateboard-emoji-clipart-md.png&f=1&nofb=1&ipt=34bb58497806acd3f4076ae18130f46055be24b0486ecd201910c79810f81ef8&ipo=images"), auto',
      },
      p: {
        color: "limegreen",
      },
    }),
  },
});
