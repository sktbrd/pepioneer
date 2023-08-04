import { useEffect, useState } from "react";

import { usePioneer } from "lib/context/Pioneer";

import NFTWallet from "./nft/nftWallet";
import EvmBalance from "./evm /evmWallet";
import HiveBalanceDisplay from "./hive/hiveBalance";
import FiatBalance from "./fiat/fiat";
import { 
  useMediaQuery,
  Box,
  Flex,
  Text
 } from "@chakra-ui/react";

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

const Wallet = () => {

  const { state, dispatch } = usePioneer();
  const { api, user,context, wallets } = state;
  if (user && user.publicAddress) {
    console.log("usuario:", user.publicAddress);
  } else {
    console.log("publicAddress does not exist in the user object.");
  }
  const address = user?.publicAddress;
  const [nftList, setNftList] = useState<NFT[]>([]);

  const onStart = async function () {
    try {
      if (!api) {
        console.error("API object is null or not available.");
        return;
      }

      const portfolioBalance = await api.GetPortfolio({ address });

      if (!portfolioBalance.data || !portfolioBalance.data.nfts) {
        console.error("No NFT data found in portfolioBalance.");
        return;
      }

      setNftList(portfolioBalance.data.nfts);
      console.log("Portfolio:", portfolioBalance);
      console.log("NFTs:", portfolioBalance.data.nfts);
    } catch (e) {
      console.error("header e: ", e);
    }
  };

  useEffect(() => {
    onStart();
  }, [api, user, user?.assetContext]);

  const [isSmallerThan768] = useMediaQuery("(max-width: 768px)");

  return (
    <div>
            <Text
        textAlign="center"
        fontWeight="700"
        fontSize="22px"
        color="limegreen"
        padding="10px"
      >
        Wallet Page
      </Text>
      <Flex direction={isSmallerThan768 ? "column" : "row"}>
        <Box flex="1" mr={isSmallerThan768 ? "0" : "10px"} mb={isSmallerThan768 ? "10px" : "0"}>
          <Box >
          <FiatBalance/>
          <HiveBalanceDisplay/>
          </Box> 
          <Box padding="5px"></Box>
          <NFTWallet nftList={nftList} /> 
        </Box>
        <Box flex="1" ml={isSmallerThan768 ? "0" : "10px"} mt={isSmallerThan768 ? "10px" : "0"}>
          <EvmBalance/>
        </Box>
      </Flex>
    </div>
  );
};

export default Wallet;
