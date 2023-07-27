import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const HiveLogin = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    console.log(username);
    // Here you can implement the login logic
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Hive Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input 
            placeholder="Username" 
            value={username} 
            onChange={(event) => setUsername(event.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleLogin}>
            Login
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HiveLogin;
