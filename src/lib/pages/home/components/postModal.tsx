import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import PostHeader from './postHeader';
import PostFooter from './modalFooter';

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  author: string;
  user: any;
  permlink: string;
  weight: 10000;  // Assuming you have weight data
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onClose, title, content, author, user, permlink, weight }) => {
  const avatarUrl = `https://images.ecency.com/webp/u/${author}/avatar/small`;

  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [charactersToShow, setCharactersToShow] = useState(0);
  const [userScrolled, setUserScrolled] = useState(false);

  const handleScroll = () => {
    const isAtBottom =
      modalContainerRef.current!.scrollTop >=
      (modalContainerRef.current!.scrollHeight || 0) - (modalContainerRef.current!.offsetHeight || 0);
    setUserScrolled(!isAtBottom);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCharactersToShow((prevChars) => {
        if (prevChars >= content.length) {
          clearInterval(timer);
          return prevChars;
        } else {
          return prevChars + 1;
        }
      });
    }, 5);

    return () => clearInterval(timer);
  }, [content]);

  useEffect(() => {
    if (modalContainerRef.current && !userScrolled) {
      modalContainerRef.current.scrollTop = modalContainerRef.current.scrollHeight;
    }
  }, [charactersToShow, userScrolled]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <PostHeader title={title} author={author} avatarUrl={avatarUrl} onClose={onClose} /> 
        </ModalHeader>
        <ModalBody ref={modalContainerRef} onScroll={handleScroll}>
          <ReactMarkdown
            children={content.slice(0, charactersToShow)}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          />
        </ModalBody>
        <PostFooter onClose={onClose} user={user} author={author} permlink={permlink} weight={weight} /> 
      </ModalContent>
    </Modal>
  );
};

export default PostModal;
