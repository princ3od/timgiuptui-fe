import { useEffect, useState } from 'react';

import { Box, IconButton, ScaleFade, StatUpArrow } from '@chakra-ui/react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <Box position="fixed" bottom="8" right="8">
      <ScaleFade in={isVisible}>
        <IconButton aria-label="Scroll to top" icon={<StatUpArrow color="black" />} size="lg" onClick={scrollToTop} />
      </ScaleFade>
    </Box>
  );
};

export default ScrollToTopButton;
