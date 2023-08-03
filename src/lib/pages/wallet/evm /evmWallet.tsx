export {};

import React, { useEffect, useState } from "react";
import { usePioneer } from "lib/context/Pioneer";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Select,
  Flex,
  Button,
  Text
} from "@chakra-ui/react";

interface Balance {
  id: string;
  image: string;
  name: string;
  balance: string;
  balanceUSD: string;
  network: string;
  pubkey: string;
}

const EvmBalance: React.FC = (): JSX.Element => {
  const { state, dispatch } = usePioneer();
  const { user } = state;

  const headers = ["Asset", "Balance", "Balance USD"];

  const [tableData, setTableData] = useState<Balance[]>(user?.balances || []);
  const [selectedBlockchain, setSelectedBlockchain] = useState<string>("all");

  useEffect(() => {
    if (user?.balances) {
      if (selectedBlockchain === "all") {
        setTableData(user.balances);
      } else {
        setTableData(user.balances.filter((balance: Balance) => balance.network === selectedBlockchain));
      }
    }
  }, [selectedBlockchain, user?.balances]);

  const blockchains: string[] = Array.from(new Set(user?.balances?.map((balance: Balance) => balance.network))) || [];
  blockchains.unshift("all");   

  const totalBalanceUSD = tableData.reduce(
    (total, balance) => total + parseFloat(balance.balanceUSD || "0"),
    0
  );

  // Function to copy the receiving address to the clipboard
  const copyToClipboard = (address: string): void => {
    const textarea = document.createElement("textarea");
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert( address +" copied to clipboard!");
  };

  return (
    <Box 
      className="hive_box" 
      borderRadius="12px" 
      border="1px solid limegreen" 
      padding="10px" 
      overflow="auto" 
      fontFamily="'Courier New', monospace">
      <Text 
        textAlign="center" 
        borderRadius="12px" 
        fontWeight="700" 
        fontSize="18px" 
        color="limegreen" 
        padding="10px">
        EVM Balance
      </Text>

      <Flex align="center">
        <Box>
          <h2>Total Estimated Balance of EVMs</h2>
          <p>{totalBalanceUSD.toFixed(2)} USD</p>
        </Box>
        <Select
          value={selectedBlockchain}
          onChange={(e) => setSelectedBlockchain(e.target.value)}
          ml="auto"
          w="150px"
        >
          {blockchains.map((blockchain) => (
            <option key={blockchain} value={blockchain as string}>
              {blockchain === "all" ? "All Blockchains" : blockchain}
            </option>
          ))}
        </Select>
      </Flex>
      {tableData.length === 0 ? (
        <p>No balances found for the selected blockchain. Try to connect wallet again</p>
      ) : (
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th>Receive</Th>
              <Th>Send</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((balance) => (
              <Tr key={balance.id}>
                <Td>
                  <Image src={balance.image} alt={balance.name} boxSize="20px" mr="2" />
                  {balance.name}
                </Td>
                {/* Use the toFixed method to limit the decimals */}
                <Td>{parseFloat(balance.balance).toFixed(2)}</Td>
                <Td>{parseFloat(balance.balanceUSD).toFixed(2)}</Td>
                <Td>
                  <Button onClick={() => copyToClipboard(balance.pubkey)}>Receive</Button>
                </Td>
                <Td>
                  <Button onClick={() => console.log("clicked")}>Send</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default EvmBalance;
