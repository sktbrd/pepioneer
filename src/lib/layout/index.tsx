import { Box, Flex, Stack } from "@chakra-ui/react";
import type { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box padding="10px" display="flex" maxWidth="100%" transition="0.5s ease-out" overflowX="hidden">
      <Meta />
      <Stack direction="column" spacing={4} flexGrow={1} width="100%">
        <Header />
        <Box as="main">
          {children}
        </Box>
        <Footer />
      </Stack>
    </Box>
  );
};

export default Layout;
