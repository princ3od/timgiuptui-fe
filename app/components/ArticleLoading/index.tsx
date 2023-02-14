import { Box, BoxProps, Skeleton, SkeletonText, Stack } from '@chakra-ui/react';

const ArticleLoading: React.FC<BoxProps> = (props) => {
  return (
    <Box className="article-container" {...props}>
      <Box className="left-content">
        <Skeleton width="100%" height="100%" borderRadius="8px" />
      </Box>
      <Box className="right-content" flex="1">
        <Stack spacing={4}>
          <Skeleton width="100%">
            <Box as="h3">Tieu de bai viet</Box>
          </Skeleton>
          <SkeletonText w="100%" noOfLines={4} spacing="4" />
        </Stack>
      </Box>
    </Box>
  );
};

export default ArticleLoading;
