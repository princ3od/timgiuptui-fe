import { extendTheme, type ThemeConfig } from '@chakra-ui/react';


const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};
const theme = extendTheme(
  {
    config,
    fonts: {
      heading: 'Roboto Mono, monospace',
      body: 'Roboto Mono, monospace',
    },
    styles: {
      global: {
        h1:{
          fontSize: '32px',
          fontWeight: '400',
          lineHeight: '42px',
        },
        h3:{
          fontSize: '18px',
          fontWeight: '700',
          lineHeight: '21px',
        },
        
      },
    },

  },
);

export default theme;
