import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

function PostFooter({ onClose, onVote }) {
  return (
    <Flex justify="space-between" align="center">
      <Button
        bg="#121212"
        color="#fff"
        borderRadius="4px"
        p={2}
        onClick={onClose}
        _hover={{ bg: 'limegreen', color: '#020202' }}
      >
        Close
      </Button>
      <Button
        bg="limegreen"
        color="#020202"
        borderRadius="4px"
        p={2}
        onClick={onVote}
        _hover={{ bg: '#020202', color: 'limegreen' }}
      >
        Vote
      </Button>
    </Flex>
  );
}

export default PostFooter;
