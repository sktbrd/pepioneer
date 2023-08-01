import { useEffect, useState } from "react";

import { usePioneer } from "lib/context/Pioneer";

import NFTWallet from "./nft/nftWallet";
import EvmBalance from "./evm /evmWallet";
import HiveBalanceDisplay from "./hive/hiveBalance";


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

  return (
    <div>
      <h1>Wallet Page</h1>
      <HiveBalanceDisplay/>      
      <EvmBalance/>
      <NFTWallet nftList={nftList} />
    </div>
  );
};

export default Wallet;
