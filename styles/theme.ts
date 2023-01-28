import { extendTheme, withDefaultColorScheme, type ThemeConfig } from '@chakra-ui/react';
import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

import { breakpoints } from '@constants/index';

import variables from './export.module.scss';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme(
  {
    config,
    fonts: {
      heading: 'Inter, sans-serif',
      body: 'Inter, sans-serif',
    },
    styles: {
      global: {
        'html, body': {
          margin: 0,
          padding: 0,
          fontWeight: 'normal',
          width: '100%',
          height: '100%',
        },
        '#__next': {
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        },
        h1: {
          fontWeight: '800',
          fontSize: '32px',
          lineHeight: '40px',
        },
        h2: {
          fontWeight: '700',
          fontSize: '24px',
          lineHeight: '32px',
        },
        h3: {
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '24px',
        },
        p: {
          fontWeight: '400',
          fontSize: '14px',
          lineHeight: '20px',
        },
        small: {
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '16px',
        },
      },
    },
    breakpoints: {
      sm: `${breakpoints.mobile}px`,
      md: `${breakpoints.tablet}px`,
    },
    colors: {
      primary: {
        50: variables.colorGrey100,
        100: variables.colorGrey200,
        500: variables.colorPrimaryBlack,
        600: '#3e3e3e',
        700: variables.colorPrimaryBlack,
      },
    },
    components: {
      Button: {
        baseStyle: {
          color: variables.colorPrimaryWhite,
        },
        defaultProps: {
          size: 'lg',
          variant: 'solid',
        },
        variants: {
          link: {
            color: variables.colorPrimaryBlack,
            fontWeight: '400',
            fontSize: '14px',
            textDecoration: 'underline',
          },
          outlineIcon: {
            color: variables.colorPrimaryBlack,
            borderRadius: '50%',
            border: `1px solid ${variables.colorGrey200}`,
            bg: 'transparent',
            _hover: {
              bg: variables.colorGrey100,
            },
            _active: {
              bg: variables.colorGrey200,
            },
          },
          tertinary: defineStyle({
            bgColor: variables.colorSecondaryYellow,
            color: variables.colorPrimaryBlack,
          }),
        },
      },
      Input: {
        defaultProps: {
          focusBorderColor: variables.colorPrimaryBlack,
        },
      },
      Shimmer: {
        defaultProps: {
          startColor: variables.colorSecondaryLightGrey,
          endColor: variables.colorGrey200,
          speed: 0.6,
        },
      },
      Divider: defineStyleConfig({
        variants: {
          sectionLine: defineStyle({
            borderRadius: 'lg',
            borderWidth: '0.5px',
            borderStyle: 'solid',
            borderColor: '#808285',
            mt: '16px',
            mb: '24px',
            variant: 'solid',
          }),
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: 'primary' }),
);

export default theme;
