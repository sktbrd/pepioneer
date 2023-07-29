import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const DEFAULT_IMAGE_URL = "https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif";

interface NFTCardProps {
  imageUrl: string;
  name: string;
  description: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ imageUrl, name, description }) => {
  const imageSrc = imageUrl || DEFAULT_IMAGE_URL;

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Image src={imageSrc} alt={name} boxSize="200px" objectFit="cover" borderRadius="md" />
      <Text mt={4} fontSize="xl" fontWeight="bold">
        {name}
      </Text>
      <Text mt={2}>{description}</Text>
    </Box>
  );
};

export default NFTCard;
