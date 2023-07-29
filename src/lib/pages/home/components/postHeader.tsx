import { Flex, Link } from "@chakra-ui/react";

export function PostHeader({ author, title }) {
    return (
      <Flex justify="space-between" align="center">
        <Link href="/" isExternal color="limegreen">
          {author}
        </Link>
        <Flex>
          {/* Add any additional elements here */}
        </Flex>
      </Flex>
    );
  }