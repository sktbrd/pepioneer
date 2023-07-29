import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism } from 'prism-react-renderer';
import useAuthUser from '../../../../lib/context/Pioneer/useAuthUser.js';
import voteOnContent from '../../../../lib/context/Pioneer/voting.js';
import remarkGfm from 'remark-gfm';
import PostFooter from './modalFooter';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Replace 'vs' with the desired code theme


import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link as ChakraLink, // Import Chakra UI Link component
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Table,
  Th,
  Td,
} from '@chakra-ui/react';


// Custom Blockquote component
const BlockquoteComponent: React.FC = ({ children }) => (
  <blockquote style={{ color: 'limegreen', paddingLeft: '1em', borderLeft: '0.25em solid #ddd' }}>
    {children}
  </blockquote>
);

// Custom Table component
const TableComponent: React.FC = ({ children }) => (
  <Box overflowX="auto">
    <Table color="yellow" borderCollapse="collapse" width="100%">
      {children}
    </Table>
  </Box>
);

// Custom TableCell component
const TableCellComponent: React.FC<{ isHeader: boolean }> = ({ isHeader, children }) => {
  const Tag = isHeader ? Th : Td;
  return (
    <Tag color="yellow" padding="10px" border={isHeader ? 'none' : '1px solid #ddd'}>
      {children}
    </Tag>
  );
};

interface CustomRenderers {
  // Add other custom renderers here
  code: React.FC<{ language: string; value: string }>;
  blockquote: React.FC;
  table: React.FC;
  tableCell: React.FC<{ isHeader: boolean }>;
  image: React.FC<{ src: string; alt: string }>;
  link: React.FC<{ href: string }>;
  strong: React.FC;
  paragraph: React.FC;
  b: React.FC;
  div: React.FC<{ className: string }>;
}

export default function PostModal({ title, content, author, permlink, onClose, isOpen }: any) {
  const { user } = useAuthUser();

  const handleVote = async () => {
    try {
      // You can pass the desired vote weight as the last argument (e.g., 5000)
      await voteOnContent(user, author, permlink, 10000);
      console.log('Vote successful!');
    } catch (error) {
      console.error('Vote failed:', error);
      // Handle voting error
    }
  };

  const handleClose = () => {
    // Use the prop to close the modal
    if (typeof onClose === 'function') {
      onClose();
    }
  };
  
  const preprocessContent = (content: string) => {
    // Update the regex pattern to handle links with parentheses in the URL
    const imageRegexEcency = /\(https:\/\/images\.ecency\.com\/[^)]+\)/g;
    const imageRegexHiveBlog = /\(https:\/\/images\.hive\.blog\/[^)]+\)/g;
    const imageRegexEcencyP = /\(https:\/\/images\.ecency\.com\/p\/[^)]+\)/g;

    const replacedContent = content
      .replace(imageRegexEcency, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      })
      .replace(imageRegexHiveBlog, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      })
      .replace(imageRegexEcencyP, (match) => {
        const url = match.slice(1, -1); // Remove the surrounding parentheses
        return `![image](${url})`;
      });

    return replacedContent;
  };
  const processedContent = preprocessContent(content);

  // Generate the avatar image URL based on the author's name
  const avatarUrl = `https://images.ecency.com/webp/u/${author}/avatar/small`;

  // Custom renderers for ReactMarkdown
  const renderers: CustomRenderers = {
    blockquote: BlockquoteComponent,
    table: TableComponent,
    tableCell: TableCellComponent,
    image: ({ src, alt }) => {
      // Check if the image URL matches the avatar image URL pattern
      if (src.startsWith('https://images.ecency.com/webp/u/')) {
        return (
          <Image
            src={src}
            alt={alt}
            style={{ border:'1px solid limegreen', marginLeft: '40%', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '100%' }}
          />
        );
      } else {
        // Render a placeholder image for other images
        return (
          <Image
            src={placeholderImageUrl}
            alt={alt}
            style={{ borderRadius:"10ox", border:'1px solid limegreen',maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        );
      }
    },
    link: ({ href }) => {
      // Check if the link is from "images.ecency.com" or "images.hive.blog"
      if (href.startsWith('https://images.ecency.com/p/') || href.startsWith('https://images.hive.blog/')) {
        // Render the link as an image
        return (
          <Image
            src={href}
            alt="Link Preview"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        );
      } else {
        // If it's not from "images.ecency.com" or "images.hive.blog", render a regular Chakra UI Link component
        return (
          <ChakraLink color="yellow" href={href} target="_blank" rel="noopener noreferrer">
            {href}
          </ChakraLink>
        );
      }
    },
    // Custom renderer for bold text
    strong: ({ children }) => <strong style={{ fontWeight: 'bold', color: 'rgb(255, 235, 18)' }}>{children}</strong>,
    // Custom paragraph renderer
    paragraph: ({ children }) => (
      <div style={{ fontWeight: 'bold', color: 'limegreen' }}>
        {children}
      </div>
    ),
    // Custom renderer for the b (bold) tag
    b: ({ children }) => {
      // Convert the children array to a string
      const textContent = React.Children.toArray(children)
        .map((child) => (typeof child === 'string' ? child : ''))
        .join('');

      // Check if there is a markdown link inside the bold tag
      const markdownLinkRegex = /\[(.*?)\]\((.*?)\)/;
      const matches = textContent.match(markdownLinkRegex);

      if (matches) {
        const linkText = matches[1];
        const linkHref = matches[2];

        // Render the markdown link inside the bold tag as a clickable link
        return (
          <ChakraLink style={{ fontWeight: 'bold', color: 'limegreen' }} href={linkHref} target="_blank" rel="noopener noreferrer">
            {linkText}
          </ChakraLink>
        );
      } else {
        // If there are no markdown links, render the bold text without any changes
        return <strong style={{ fontWeight: 'bold', color: 'limegreen' }}>{children}</strong>;
      }
    },
    div: ({ children, className }) => {
      if (className === 'pull-left') {
        return (
          <div style={{ float: 'left' }}>
            {children}
          </div>
        );
      } else if (className === 'pull-right') {
        return (
          <div style={{ float: 'right' }}>
            {children}
          </div>
        );
      } else {
        return <div>{children}</div>;
      }
    },
    // ... (other custom renderers)
  };

  // State variable to keep track of the number of characters to display
  const [charactersToShow, setCharactersToShow] = useState(0);

  // State variable to track if the user has manually scrolled
  const [userScrolled, setUserScrolled] = useState(false);

  // Event handler to track the user's scrolling behavior
  const handleScroll = () => {
    // Check if the user has scrolled to the bottom of the modal
    const isAtBottom = modalContainerRef.current.scrollTop >= modalContainerRef.current.scrollHeight - modalContainerRef.current.offsetHeight;
    setUserScrolled(!isAtBottom);
  };

  useEffect(() => {
    // Show a new character every 5 milliseconds (adjust as needed)
    const timer = setInterval(() => {
      setCharactersToShow((prevChars) => {
        // Check if all characters are already shown
        if (prevChars >= processedContent.length) {
          // Clear the interval
          clearInterval(timer);
        } else {
          // If not all characters are shown, increment the count
          return prevChars + 1;
        }
      });
    }, 5);
  
    // Clear the interval when the component is unmounted
    return () => clearInterval(timer);
  }, [processedContent]);
  

  useEffect(() => {
    // Scroll the modal container as characters are added, but only if the user has not scrolled manually
    if (modalContainerRef.current && !userScrolled) {
      modalContainerRef.current.scrollTop = modalContainerRef.current.scrollHeight;
    }
  }, [charactersToShow, userScrolled]);

  // Ref to access the modal container element
  const modalContainerRef = useRef<HTMLDivElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent
        border="1px solid limegreen"
        bg="#171616"
        color="limegreen"
        borderRadius="8px"
        p={5}
        maxW="700px"
        w="100%"
        m="0 auto"
        overflowY="auto"
        maxH="95vh"
        fontFamily="'Courier New', Courier, monospace"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.2)"
      >
        <ModalHeader mb={5} color="limegreen">
          <Heading as="h3" size="lg">{title}</Heading>
        </ModalHeader>
        <ModalCloseButton
          bg="#121212"
          color="#fff"
          borderRadius="4px"
          p={2}
          _hover={{ bg: "limegreen", color: "#020202" }}
        />
        <ModalBody>
          <Box mb={5}>
            <Text as="p" color="limegreen" >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={renderers}
              >
                {processedContent.substring(0, charactersToShow)}
              </ReactMarkdown>
            </Text>
          </Box>
        </ModalBody>
        <PostFooter
          position="sticky"
          bottom={0}
          p={4}
          borderTop="1px solid"
          borderColor="limegreen"
          bg="#171616"
        >
          <Button
            bg="limegreen"
            color="#020202"
            borderRadius="4px"
            p={2}
            onClick={handleVote}
            _hover={{ bg: "#020202", color: "limegreen" }}
          >
            Vote
          </Button>
          <Button
            bg="#121212"
            color="#fff"
            borderRadius="4px"
            p={2}
            ml={4}
            onClick={handleClose}
            _hover={{ bg: "limegreen", color: "#020202" }}
          >
            Close
          </Button>
        </PostFooter>
      </ModalContent>
    </Modal>
  );
}
