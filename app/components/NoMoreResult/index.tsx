import { useEffect, useState } from 'react';

import { Flex, Divider, Box } from '@chakra-ui/react';

const NoMoreResult = () => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const opacity = scroll / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
      setOpacity(opacity);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <Flex mt="8" mb="16" justifyContent="center" align="center" opacity={opacity} transform={`scale(${opacity})`}>
      <Divider mx="4" />
      <Box whiteSpace="nowrap">👻 Không còn kết quả nào 👻</Box>
      <Divider mx="4" />
    </Flex>
  );
};

export default NoMoreResult;
