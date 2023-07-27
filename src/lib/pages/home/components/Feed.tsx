import React, { useEffect, useState } from "react";

import { Client } from "@hiveio/dhive";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";

const nodes = [
  "https://rpc.ecency.com",
  "https://api.deathwing.me",
  "https://api.hive.blog",
  "https://api.openhive.network",
  "https://api.hive.blog",
  "https://anyx.io",
  "https://api.pharesim.me",
];

const defaultThumbnail =
  "https://images.ecency.com/u/hive-173115/avatar/large";
const placeholderEarnings = 69.42; // Replace with actual placeholder value

const PlaceholderPostModal = ({ title, content, author, onClose }: {
  title: string;
  content: string;
  author: string;
  onClose: () => void;
}) => {
  // Placeholder PostModal component, you can replace this with your actual PostModal
  return (
    <Box>
      <Text>Post Modal</Text>
      <Text>Title: {title}</Text>
      <Text>Author: {author}</Text>
      <Text>Content: {content}</Text>
      <Text onClick={onClose}>Close Modal</Text>
    </Box>
  );
};

const PlaceholderLoadingBar = () => {
  // Placeholder LoadingBar component, you can replace this with your actual LoadingBar
  return <Text>Roll a Joint...</Text>;
};

const HiveBlog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [tag, setTag] = useState("hive-173115"); // set the default search author to "skatehive"
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [client, setClient] = useState(new Client(nodes[0]));
  const [nodeIndex, setNodeIndex] = useState(0);

  const fetchPostEarnings = async (author: string, permlink: string): Promise<number> => {
    try {
      const post = await client.database.call("get_content", [author, permlink]);
      const totalPayout = parseFloat(post.total_payout_value.split(" ")[0]);
      const curatorPayout = parseFloat(post.curator_payout_value.split(" ")[0]);
      const pendingPayout = parseFloat(post.pending_payout_value.split(" ")[0]);
      const totalEarnings = totalPayout + curatorPayout + pendingPayout;
      return totalEarnings;
    } catch (error) {
      // If a request fails, switch to the next node
      const newIndex = (nodeIndex + 1) % nodes.length;
      setNodeIndex(newIndex);
      setClient(new Client(nodes[newIndex]));
      console.log(`Switched to node: ${nodes[newIndex]}`);
      // Retry the request with the new node
      return fetchPostEarnings(author, permlink);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);

    try {
      const query = {
        tag: tag,
        limit: 100,
      };
      const result = await client.database.getDiscussions("created", query);

      const postsWithThumbnails = result.map((post) => {
        const metadata = JSON.parse(post.json_metadata);
        const thumbnail =
          Array.isArray(metadata?.image) && metadata.image.length > 0
            ? metadata.image[0]
            : defaultThumbnail;
        return { ...post, thumbnail, earnings: 0 }; // Initialize earnings to 0
      });

      // Fetch earnings for each post concurrently
      const earningsPromises = postsWithThumbnails.map((post) =>
        fetchPostEarnings(post.author, post.permlink).catch((error) => {
          console.log(error);
          return placeholderEarnings; // Use placeholder value if fetching actual earnings fails
        })
      );
      const earnings = await Promise.all(earningsPromises);

      // Update earnings for each post
      const updatedPostsWithEarnings = postsWithThumbnails.map(
        (post, index) => ({ ...post, earnings: earnings[index] })
      );
      setPosts(updatedPostsWithEarnings);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [tag]);

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    console.log(post.body);
    console.log(post);
  };

  const handleModalClose = () => {
    setSelectedPost(null);
  };

  const calculateGridColumns = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1400) {
      return 5;
    } else if (screenWidth >= 1100) {
      return 4;
    } else if (screenWidth >= 800) {
      return 3;
    } else if (screenWidth >= 500) {
      return 2;
    } else {
      return 1;
    }
  };
  const [gridColumns, setGridColumns] = useState(calculateGridColumns());

  useEffect(() => {
    const handleResize = () => {
      setGridColumns(calculateGridColumns());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box>
      {selectedPost && (
        <Box>
          <PlaceholderPostModal
            title={selectedPost.title}
            content={selectedPost.body}
            author={selectedPost.author}
            onClose={handleModalClose}
          />
        </Box>
      )}
      {isLoading ? (
        <PlaceholderLoadingBar />
      ) : (
        <Box
          display="grid"
          gridTemplateColumns={`repeat(${gridColumns}, minmax(280px, 1fr))`}
          gridGap={3}
        >
          {posts.map((post) => (
            <Card
              border={"1px"}
              borderColor={"limegreen"}
              bg={"black"}
              key={post.permlink}
              maxW="md"
              mb={4}
              onClick={() => handlePostClick(post)}
            >
              <CardHeader>
                <Flex>
                  <Flex flex="1" gap="4" alignItems="center">
                    <Avatar
                      name={post.author}
                      src={`https://images.ecency.com/webp/u/${post.author}/avatar/small`}
                    />
                    <Box>
                      <Heading size="sm">{post.author}</Heading>
                    </Box>
                  </Flex>
                  <IconButton
                    variant="ghost"
                    colorScheme="gray"
                    aria-label="See menu"
                  />
                </Flex>
              </CardHeader>
              <Box padding="10px" height="200px">
                {/* Set the fixed height for thumbnails */}
                <Image
                  objectFit="cover"
                  border="1px solid limegreen"
                  borderRadius="10px"
                  src={post.thumbnail}
                  alt="Post Thumbnail"
                  height="100%" // Make the image fill the container height
                  width="100%" // Ensure the image maintains its aspect ratio
                />
              </Box>
              <CardBody>
                <Text>{post.title}</Text>
              </CardBody>
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  "& > button": {
                    minW: "136px",
                  },
                }}
              >
                <Button flex="1" variant="ghost">
                  Like
                </Button>
                <Button flex="1" variant="ghost">
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default HiveBlog;
