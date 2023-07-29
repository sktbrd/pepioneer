import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@chakra-ui/react";

import useAuthUser from "../../../../lib/context/Pioneer/useAuthUser.js";


interface HiveLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const HiveLogin: React.FC<HiveLoginProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const { loginWithHive, user } = useAuthUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginWithHive(username);
    setUsername("");
    onClose();

  };

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSignUp = () => {
    window.open("https://discord.gg/skatehive", "_blank");
  };

  const handleLogin = () => {
    console.log("User from dhive:", user);
    handleSubmit();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Hive Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            required
          />
        </ModalBody>
        <ModalFooter>
          <Button type="submit" onClick={handleLogin}>
            Login
          </Button>
          <Button type="button" onClick={handleSignUp}>
            Sign Up
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HiveLogin;
