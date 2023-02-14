import { SearchIcon } from '@chakra-ui/icons';
import { Box, Container } from '@chakra-ui/react';

const NoResult: React.FC = () => {
  return (
    <Container
      height="50vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <SearchIcon boxSize="40px" />
      <Box as="h3">Không tìm bài viết nào</Box>
      <Box as="p" pb="4">
        Rất tiếc, chúng tôi không thể tìm thấy kết quả nào, vui lòng thử lại với từ khóa khác.
      </Box>
    </Container>
  );
};

export default NoResult;
