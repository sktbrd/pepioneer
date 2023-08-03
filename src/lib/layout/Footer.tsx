import { Flex, Link, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      width="full"
      align="center"
      alignSelf="flex-end"
      justifyContent="center"
    >
      <Text fontSize="xs">
        {new Date().getFullYear()} -{" "}
        <Link href="https://docs.skatehive.app" isExternal>
          built with open source weed. copyright is a tripping right now
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
