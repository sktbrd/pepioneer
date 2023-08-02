import { useState, useEffect } from "react";
import { FaCoins } from 'react-icons/fa';
import { Image } from '@chakra-ui/react';
import SendHiveModal from './sendHiveModal';
import useAuthUser from "./useAuthUser";

import { Box, Flex, Text } from '@chakra-ui/react';

interface ExtendedAccount {
    balance: string;
    hive_power: string;
    hbd_balance: string;
    savings_hbd_balance: string;
    username: string;
    name: string;
}

declare global {
    interface Window {
        hive_keychain: any; // Replace 'any' with the correct type if available
    }
}

export default function HiveBalanceDisplay() {
    const { user } = useAuthUser() as { user: ExtendedAccount | null };
    const [hiveBalance, setHiveBalance] = useState<string>('0');
    const [hivePower, setHivePower] = useState<string>('0');
    const [hbdBalance, setHbdBalance] = useState<string>('0');
    const [savingsBalance, setSavingsBalance] = useState<string>('0');
    const [isLoading, setIsLoading] = useState(false);
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [showModal, setShowModal] = useState(false);

    const  onStart = async function () {
        console.log("USEER:" ,user)
        if (user?.balance && user?.hive_power) {
            // setHiveBalance(user.balance);
            // setHivePower(user.hive_power);
            // setHbdBalance(user.hbd_balance);
            // setSavingsBalance(user.savings_hbd_balance);
        }
    };

    useEffect(() => {
        onStart();
    }, []);

    // Define an interface for the response from hive_keychain.requestTransfer
    interface HiveKeychainTransferResponse {
        success: boolean;
        message: string;
        data: any; // You can provide a more specific type for 'data' if you know the structure
    }

    const handleTransfer = async () => {
        if (window?.hive_keychain && user?.name) {
            const formattedAmount = parseFloat(amount).toFixed(2);
            window.hive_keychain.requestTransfer(
                user.name,
                toAddress,
                formattedAmount,
                "#Test Keychain SDK transfer(will be encrypted)",
                "HIVE",
                (response: HiveKeychainTransferResponse) => {
                    console.log(response);
                    if (response.success) {
                        // Handle successful transfer
                    } else {
                        // Handle error
                        console.log("Transfer failed:", response.message);
                    }
                },
                false
            );
        } else {
            console.log("Hive Keychain extension not installed, not enabled, or no user connected.");
        }
    }

    const handleOpenModal = () => {
        setShowModal(true);
    }

    return (
        <Box 
            className="hive_box" 
            borderRadius="12px" 
            border="1px solid red" 
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
            Hive Balance
            </Text>
                    <Flex className="hive_avatar_container" alignItems="center">
                        {user ? (
                            <>
                                <Image
                                    src={`https://images.hive.blog/u/${user.name}/avatar`}
                                    alt="profile avatar"
                                    borderRadius="20px"
                                    border="2px solid limegreen"
                                    boxSize="40px"
                                />
                                <Text padding="10px" color="limegreen">{user.name}</Text>
                            </>
                        ) : (
                            <>
                            <Image
                                    src={`https://i.gifer.com/origin/f1/f1a737e4cfba336f974af05abab62c8f_w200.gif`}
                                    alt="pepito"
                                    borderRadius="20px"
                                    boxSize="60px"
                                    
                                />
                            </>
                        )}
                    </Flex>
                    <Flex className="hive_balance_container" mt="2em" overflowX="auto">
                    {user ? (
                        <Text>
                            <p>Hive Balance: {user?.balance}</p>
                            <p>HBD Balance: {user?.hbd_balance}</p>
                            <p>Savings: {user?.savings_hbd_balance}</p>
                        </Text>
                        ) : (
                            <Text className="hive_name" color="limegreen">Try Connect your wallet and refresh the page</Text>
                        )}
                            </Flex>
                    {showModal && (
                        <SendHiveModal
                            toAddress={toAddress}
                            setToAddress={setToAddress}
                            amount={amount}
                            setAmount={setAmount}
                            handleTransfer={handleTransfer}
                            setShowModal={setShowModal}
                        />
                    )}         
        </Box>
    );
}
