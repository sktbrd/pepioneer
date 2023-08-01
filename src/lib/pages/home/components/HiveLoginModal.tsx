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

import useAuthUser from "./useAuthUser.js";

interface HiveLoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const HiveLogin: React.FC<HiveLoginProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const { loginWithHive, user } = useAuthUser();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await loginWithHive(username);
    setUsername("");
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSignUp = () => {
    window.open("https://discord.gg/skatehive", "_blank");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>Hive Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {user && user.name ? (
            <p>Welcome, {user.name}!</p>
          ) : (
            <>
              <Input
                type="text"
                name="username"
                placeholder="Username"
                value={username}
                onChange={handleInputChange}
                required
              />
              <Button type="submit">Login</Button>
              <Button type="button" onClick={handleSignUp}>
                Sign Up
              </Button>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default HiveLogin;
