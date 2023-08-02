import { 
  Grid, 
  Select, 
  Box,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NFTCard from "./nftCard";

export interface NFT {
  imageUrl: string;
  name: string;
  description: string;
  collectionAddress: string;
  nftStandard: string;
  network: string;
  token: {
    collection: {
      address: string;
      floorPriceEth: string;
      logoImageUrl: string;
      name: string;
      network: string;
      nftStandard: string;
      openseaId: string;
    };
    medias: {
      originalUrl: string;
    }[];
  };
  id: string;
  rarityRank: number | null;
}



interface NFTWalletProps {
  nftList: NFT[];
}

const NFTWallet: React.FC<NFTWalletProps> = ({ nftList }) => {
  const [selectedContract, setSelectedContract] = useState<string>("all");

  // Create a mapping between contract addresses and collection names
  const contractNameMap: { [address: string]: string } = {};
  nftList.forEach((nft) => {
    const address = nft.token.collection.address;
    const name = nft.token.collection.name;
    contractNameMap[address] = name;
  });

  const contracts: string[] = Array.from(new Set(nftList.map((nft: NFT) => nft.token.collection.address))) || [];
  contracts.unshift("all");

  // Filter the NFTs based on selected collection address
  const filteredNftList =
    selectedContract === "all"
      ? nftList
      : nftList.filter((nft: NFT) => nft.token.collection.address === selectedContract);

  return (
    <Box padding="5px" borderRadius="10px" border="limegreen solid 1px">
      <Text borderRadius="12px" fontWeight="700" fontSize="18px" color="limegreen" padding="10px">
        NFT Portfolio
      </Text>
      <Select value={selectedContract} onChange={(e) => setSelectedContract(e.target.value)} mb="10px">
        <option value="all">All Contracts</option>
        {contracts.map((contract) => (
          <option key={contract} value={contract}>
            {contract === "all" ? "All Contracts" : contractNameMap[contract]}
          </option>
        ))}
      </Select>


      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
  {filteredNftList.map((nft, index) => (
    <NFTCard
            key={nft.token.medias[0]?.originalUrl || `${nft.id}-${index}`}
            imageUrl={nft.token.medias[0]?.originalUrl}
            name={nft.token.collection.name}
            floorPriceEth={nft.token.collection.floorPriceEth}
            collectionAddress={nft.token.collection.address} // Corrected prop name
            nftStandard={nft.token.collection.nftStandard} // Updated to access nested property
            network={nft.token.collection.network} // Updated to access nested property
            id={nft.id}
            rarityRank={nft.rarityRank}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default NFTWallet;
