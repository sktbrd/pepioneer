import {
  useDisclosure,
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React from "react";
import HiveBlog from "./components/Feed";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div>
      <HiveBlog /> {/* Including the HiveBlog component */}
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Explore Feed</DrawerHeader>
            <DrawerFooter>
              {/* Any buttons or additional information goes here */}
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </div>
  );
};

export default Home;
