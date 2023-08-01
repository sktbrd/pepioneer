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
  Spinner,
  Select,
  Flex,
  Button,
} from "@chakra-ui/react";

interface TableProps {
  headers: string[];
  data: any[][];
}

const EvmBalance: React.FC = () => {
  const { state, dispatch } = usePioneer();
  const { user } = state;

  useEffect(() => {
    console.log("EVM: ", user);
  }, [user]);

  const headers = ["Asset", "Balance", "Balance USD"];

  const [tableData, setTableData] = useState(user.balances);
  const [selectedBlockchain, setSelectedBlockchain] = useState("all");

  useEffect(() => {
    if (selectedBlockchain === "all") {
      setTableData(user.balances);
    } else {
      setTableData(user.balances.filter((balance) => balance.network === selectedBlockchain));
    }
  }, [selectedBlockchain, user.balances]);

  const blockchains = Array.from(new Set(user.balances.map((balance) => balance.network)));
  blockchains.unshift("all");

  const totalBalanceUSD = tableData.reduce(
    (total, balance) => total + parseFloat(balance.balanceUSD || "0"),
    0
  );

  // Function to copy the receiving address to the clipboard
  const copyToClipboard = (address) => {
    const textarea = document.createElement("textarea");
    textarea.value = address;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Address copied to clipboard!");
  };

  return (
    <Box>
      <Flex align="center">
        <Box>
          <h2>Total Estimated Balance</h2>
          <p>{totalBalanceUSD.toFixed(2)} USD</p>
        </Box>
        <Select
          value={selectedBlockchain}
          onChange={(e) => setSelectedBlockchain(e.target.value)}
          ml="auto"
          w="150px"
        >
          {blockchains.map((blockchain) => (
            <option key={blockchain} value={blockchain}>
              {blockchain === "all" ? "All Blockchains" : blockchain}
            </option>
          ))}
        </Select>
      </Flex>
      {tableData.length === 0 ? (
        <p>No balances found for the selected blockchain.</p>
      ) : (
        <Table variant="simple">
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
                <Td>{balance.balance}</Td>
                <Td>{balance.balanceUSD}</Td>
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
