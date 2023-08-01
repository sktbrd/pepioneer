import React from 'react';
import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'; // Import Chakra UI components for styling

interface ModalProps {
  toAddress: string;
  setToAddress: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  handleTransfer: () => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SendHiveModal({ toAddress, setToAddress, amount, setAmount, handleTransfer, setShowModal }: ModalProps) {
  return (
    <Modal isOpen={true} onClose={() => setShowModal(false)} isCentered>
      <ModalOverlay />
      <ModalContent className="modal">
        <ModalHeader>Send Hive</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            placeholder="To Address"
            mb="1em"
          />
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            mb="1em"
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleTransfer}>
            Send Hive
          </Button>
          <Button variant="ghost" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
