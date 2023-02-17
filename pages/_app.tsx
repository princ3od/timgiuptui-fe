import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';

import theme from '@styles/theme';

import '../styles/globals.css';

dayjs().locale('vi');

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
