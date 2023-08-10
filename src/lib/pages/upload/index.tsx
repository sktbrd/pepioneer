import React, { useState } from 'react';
import {
  Box,
  Flex,
  Textarea,
  Divider,
  Button,
  Input,
  Checkbox,
  Select,
  Text
} from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface UploadPageProps {
  title: string;
  content: string;
  author: string;
  user: any;
  permlink: string;
  weight: number; // Change this to allow any number value
}

const defaultFooter = `# Wanna support Skatehive?

**Here are a few things you can do**

- Vote for [@skatehive witness](https://hivesigner.com/sign/account-witness-vote?witness=skatehive&approve=1)
- Delegate HP to @skatehive
- Follow our [curation trail](https://hive.vote/dash.php?i=1&trail=steemskate)
- Buy a Skatehive OG NFT : [Buy here](https://zora.co/collect/eth:0x3ded025e441730e26ab28803353e4471669a3065/1/mint)

**Join Skatehive Discord and connect with the community 👇**

[![](https://i.imgur.com/GmPCq0F.png)](https://discord.gg/skatehive)

**Find Skatehive On**

- Hive : https://skatehive.app/@skatehive
- Instagram : https://www.instagram.com/skatehive/
- Twitter : https://twitter.com/Skate_Hive`;

const UploadPage: React.FC<UploadPageProps> = () => {
  const [title, setTitle] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');
  const [showFooter, setShowFooter] = useState(false);
  const [videoLink, setVideoLink] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState(''); // Add this line

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddFile = () => {
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setMarkdownContent(`${markdownContent}\n![Alt Text](${imageUrl})`);
      setSelectedFile(null);
    }
  };

  const handleAddImage = () => {
    setMarkdownContent(`${markdownContent}\n![Alt Text](${image})`);
    setImage('');
  };

  const getYouTubeEmbedURL = (url: string) => {
    const videoId = url.split('v=')[1];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const handleAddVideo = () => {
    const embedURL = getYouTubeEmbedURL(videoLink);
    setMarkdownContent(
      `${markdownContent}\n<iframe src="${embedURL}"></iframe>`
    );
    setVideoLink('');
  };

  const IframeRenderer: React.FC<{ src: string }> = ({ src }) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <iframe src={src} />
    </div>
  );
  
  
  const [selectedOption, setSelectedOption] = useState<'url' | 'file'>('url'); // Add this state

  const handlePublish = () => {
    // Construct the complete post body
    const completePostBody = `
# ${title}

${markdownContent}
${showFooter ? defaultFooter : ''}
    `;
    
    // Log the complete post body
    console.log('Complete Post Body:', completePostBody);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="flex-start"
      flexDirection={{ base: 'column-reverse', md: 'row' }} // Stack vertically on mobile, side-by-side on desktop
      padding="20px"
    >
      <Box width="100%" marginBottom={{ base: '20px', md: '0' }}>
        <Text>1. Add Title</Text>
        <Input
          value={title}
          placeholder="Post Title"
          marginBottom="10px"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Text>2. Add Video</Text>
        <Flex>
          <Input
            value={videoLink}
            placeholder="YouTube Video URL"
            marginBottom="10px"
            onChange={(e) => setVideoLink(e.target.value)}
          />
          <Button onClick={handleAddVideo}>Add Video</Button>
        </Flex>
        <Text>3. Add Images</Text>
        <Flex>
          {selectedOption === 'url' ? (
            <>
              <Input
                value={image}
                placeholder="Image URL"
                marginBottom="10px"
                onChange={(e) => setImage(e.target.value)}
              />
              <Button onClick={handleAddImage}>Add</Button>
            </>
          ) : (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}
          <Flex>
            <Select
              value={selectedOption}
              onChange={(e) =>
                setSelectedOption(e.target.value as 'url' | 'file')
              }
            >
              <option value="url">URL</option>
              <option value="file">Upload</option>
            </Select>
          </Flex>
        </Flex>
        <Text>4. Description or Blog about it</Text>
        <Textarea
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          placeholder="Write your markdown content here..."
          height="300px"
        />
        <Checkbox
          isChecked={showFooter}
          onChange={() => setShowFooter(!showFooter)}
        >
          Add Skatehive Footer
        </Checkbox>
        <Text>5. Add Thumbnail</Text>
      </Box>
  
      <Divider
        orientation="vertical"
        width={{ base: '100%', md: '1px' }} // Full width on mobile, thin line on desktop
        height={{ base: '1px', md: 'auto' }} // Thin line on mobile, full height on desktop
        mx={{ base: '0', md: '20px' }}
      />
  
      <Box width="100%">
        <Text fontSize="36" fontWeight="bold" mb="10px">
          {title}
        </Text>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]}
          components={{
            img: ({ node, alt, src, title, ...props }) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  {...props}
                  alt={alt}
                  src={src}
                  title={title}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    border: '1px solid limegreen',
                  }}
                />
              </div>
            ),
            a: ({ node, children, ...props }) => (
              <a {...props} style={{ color: 'yellow' }}>
                {children}
              </a>
            ),
            h1: ({ node, children, ...props }) => (
              <h1
                {...props}
                style={{ fontWeight: 'bold', color: 'yellow', fontSize: '24px' }}
              >
                {children}
              </h1>
            ),
            h2: ({ node, children, ...props }) => (
              <h2
                {...props}
                style={{ fontWeight: 'bold', color: 'yellow', fontSize: '20px' }}
              >
                {children}
              </h2>
            ),
            h3: ({ node, children, ...props }) => (
              <h3
                {...props}
                style={{ fontWeight: 'bold', color: 'yellow', fontSize: '18px' }}
              >
                {children}
              </h3>
            ),
            blockquote: ({ node, children, ...props }) => (
              <blockquote
                {...props}
                style={{
                  borderLeft: '3px solid limegreen',
                  paddingLeft: '10px',
                  fontStyle: 'italic',
                }}
              >
                {children}
              </blockquote>
            ),
            ul: ({ node, children, ...props }) => (
              <ul style={{ paddingLeft: '20px' }} {...props}>
                {children}
              </ul>
            ),
            ol: ({ node, children, ...props }) => (
              <ol style={{ paddingLeft: '20px' }} {...props} >
                {children}
              </ol>
            ),
            iframe: ({ node, ...props }) => (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <iframe {...props} />
              </div>
            ),
          }}
        />
        {showFooter && (
          <ReactMarkdown
            children={defaultFooter}
            remarkPlugins={[remarkGfm]}
            components={{
              img: ({ node, alt, src, title, ...props }) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    {...props}
                    alt={alt}
                    src={src}
                    title={title}
                    style={{
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      border: '1px solid limegreen',
                    }}
                  />
                </div>
              ),
              a: ({ node, children, ...props }) => (
                <a {...props} style={{ color: 'yellow' }}>
                  {children}
                </a>
              ),
              h1: ({ node, children, ...props }) => (
                <h1
                  {...props}
                  style={{ fontWeight: 'bold', color: 'yellow', fontSize: '24px' }}
                >
                  {children}
                </h1>
              ),
              h2: ({ node, children, ...props }) => (
                <h2
                  {...props}
                  style={{ fontWeight: 'bold', color: 'yellow', fontSize: '20px' }}
                >
                  {children}
                </h2>
              ),
              h3: ({ node, children, ...props }) => (
                <h3
                  {...props}
                  style={{ fontWeight: 'bold', color: 'yellow', fontSize: '18px' }}
                >
                  {children}
                </h3>
              ),
              blockquote: ({ node, children, ...props }) => (
                <blockquote
                  {...props}
                  style={{
                    borderLeft: '3px solid limegreen',
                    paddingLeft: '10px',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </blockquote>
              ),
              ul: ({ node, children, ...props }) => (
                <ul style={{ paddingLeft: '20px' }} {...props}>
                  {children}
                </ul>
              ),
              ol: ({ node, children, ...props }) => (
                <ol style={{ paddingLeft: '20px' }} {...props}>
                  {children}
                </ol>
              ),
              iframe: ({ node, ...props }) => (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <iframe {...props} />
                </div>
              ),
            }}
          />
        )}
        <Box width="100%">
          <Button onClick={handlePublish} width="100%">
            Publish
          </Button>
        </Box>
      </Box>
    </Flex>
  );
  
  
  
};

export default UploadPage;
