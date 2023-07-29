import { Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NFTCard from "./nftCard";

interface NFT {
  id: string;
  balance: string;
  token: {
    collection: {
      name: string;
      description: string;
      address: string;
      // Other properties...
    };
    medias: {
      originalUrl: string;
      // Other properties...
    }[];
    // Other properties...
  };
  // Other properties...
}

interface NFTWalletProps {
  nftList: NFT[];
}

const NFTWallet: React.FC<NFTWalletProps> = ({ nftList }) => {
  return (
    <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
      {nftList.map((nft, index) => (
        <NFTCard
          key={nft.token.medias[0]?.originalUrl || `${nft.id}-${index}`}
          imageUrl={nft.token.medias[0]?.originalUrl}
          name={nft.token.collection.name}
          description={nft.token.collection.description}
        />
      ))}
    </Grid>
  );
};

export default NFTWallet;
