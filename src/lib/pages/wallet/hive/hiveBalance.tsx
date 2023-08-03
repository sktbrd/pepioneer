import React from "react";
import { Image, Box, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import SendHiveModal from "./sendHiveModal";
import useAuthUser from "./useAuthUser";
import * as dhive from "@hiveio/dhive";


const dhiveClient = new dhive.Client([
  "https://api.hive.blog",
  "https://api.hivekings.com",
  "https://anyx.io",
  "https://api.openhive.network",
]);

const HIVE_LOGO_URL = "https://cryptologos.cc/logos/hive-blockchain-hive-logo.png";
const HBD_LOGO_URL = "src/lib/assets/png/HBD.png";
const SAVINGS_LOGO_URL = "src/lib/assets/png/savings-hive.png";
const HIVE_POWER_LOGO_URL = "src/lib/assets/png/hive_power.png";
const DEFAULT_AVATAR_URL = "https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif";

// Define the user interface
interface User {
  balance: string;
  hbd_balance: string;
  savings_hbd_balance: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  name?: string;
}

export default function HiveBalanceDisplay() {
  const { user } = useAuthUser() as { user: User | null };
  const [hiveBalance, setHiveBalance] = useState<string>("0");
  const [hivePower, setHivePower] = useState<string>("0");
  const [hbdBalance, setHbdBalance] = useState<string>("0");
  const [savingsBalance, setSavingsBalance] = useState<string>("0");
  const [showModal, setShowModal] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  // Function to convert vesting shares to Hive power
  const convertVestingSharesToHivePower = async (
    vestingShares: string,
    delegatedVestingShares: string,
    receivedVestingShares: string
  ) => {
    const vestingSharesFloat = parseFloat(vestingShares.split(" ")[0]);
    const delegatedVestingSharesFloat = parseFloat(delegatedVestingShares.split(" ")[0]);
    const receivedVestingSharesFloat = parseFloat(receivedVestingShares.split(" ")[0]);
    const availableVESTS =
      vestingSharesFloat - delegatedVestingSharesFloat + receivedVestingSharesFloat;

    const response = await fetch('https://api.hive.blog', {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'condenser_api.get_dynamic_global_properties',
        params: [],
        id: 1,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    const vestHive =
      (parseFloat(result.result.total_vesting_fund_hive) * availableVESTS) /
      parseFloat(result.result.total_vesting_shares);
    return vestHive.toFixed(3);
  };

  const onStart = async function () {
    if (user) {
      setHiveBalance(user.balance);
      setHbdBalance(user.hbd_balance);
      setSavingsBalance(user.savings_hbd_balance);
      const hivePower = await convertVestingSharesToHivePower(
        user.vesting_shares,
        user.delegated_vesting_shares,
        user.received_vesting_shares
      );
      setHivePower(hivePower);
    }
  };

  useEffect(() => {
    onStart();
  }, [user]);

  const handleTransfer = async () => {
    // Your existing transfer logic
  };

  const handleOpenModal = (balanceType: string) => {
    console.log(`Clicked ${balanceType} logo`);
    console.log(user);
    setShowModal(true);
  };

  const handleLogoClick = (balanceType: string) => {
    console.log(`Clicked ${balanceType} logo`);
    console.log(user);
  };

  return (
    <Box
      className="hive_box"
      borderRadius="12px"
      border="1px solid red"
      padding="10px"
      overflow="auto"
      fontFamily="'Courier New', monospace"
    >
      <Text
        textAlign="center"
        borderRadius="12px"
        fontWeight="700"
        fontSize="18px"
        color="limegreen"
        padding="10px"
      >
        Hive Balance
      </Text>
      <Flex alignItems="center" justifyContent="left" padding="10px">
        {user ? (
          <>
            <Image
              src={`https://images.hive.blog/u/${user.name}/avatar`}
              alt="profile avatar"
              borderRadius="20px"
              border="2px solid limegreen"
              boxSize="40px"
            />
            <Text padding="10px" color="limegreen">
              {user.name}
            </Text>
          </>
        ) : (
          <>
            <Image
              src={DEFAULT_AVATAR_URL}
              alt="pepito"
              borderRadius="20px"
              boxSize="60px"
            />
          </>
        )}
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <Button border={"1px solid red"} onClick={() => handleOpenModal("Hive Balance")}>
                <Image padding="5px" src={HIVE_LOGO_URL} alt="Hive Logo" boxSize="40px" />
                <Text padding={"10px"}>Manage Hive</Text>
              </Button>
            </Td>
            <Td>{user?.balance || "Try Connect your wallet and refresh the page"}</Td>
          </Tr>
          <Tr>
            <Td>
              <Button border={"1px solid red"} onClick={() => handleOpenModal("HBD Balance")}>
                <Image padding="5px" src={HBD_LOGO_URL} alt="HBD Logo" boxSize="40px" />
                <Text padding={"10px"}>Manage HBD</Text>
              </Button>
            </Td>
            <Td>{user?.hbd_balance || "Try Connect your wallet and refresh the page"}</Td>
          </Tr>
          <Tr>
            <Td>
              <Button border={"1px solid red"} onClick={() => handleOpenModal("Savings Balance")}>
                <Image padding="5px" src={SAVINGS_LOGO_URL} alt="Savings Logo" boxSize="40px" />
                <Text padding={"10px"}>Manage Sav</Text>
              </Button>
            </Td>
            <Td>{user?.savings_hbd_balance || "Try Connect your wallet and refresh the page"} Savings</Td>
          </Tr>
          <Tr>
            <Td>
              <Button border={"1px solid red"} onClick={() => handleOpenModal("Hive Power")}>
                <Image src={HIVE_POWER_LOGO_URL} alt="Hive Power Logo" boxSize="40px" />
                <Text padding={"10px"}>Manage HP.</Text>
              </Button>
            </Td>
            <Td>{hivePower || "Try Connect your wallet and refresh the page"}</Td>
          </Tr>
        </Tbody>
      </Table>
      <SendHiveModal
        showModal={showModal}
        setShowModal={setShowModal}
        toAddress={toAddress}
        setToAddress={setToAddress}
        amount={amount}
        setAmount={setAmount}
        handleTransfer={handleTransfer}
      />
    </Box>
  );
}
