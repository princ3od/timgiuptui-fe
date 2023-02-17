import React, { useCallback, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, Button, Container } from '@chakra-ui/react';
import { throttle } from 'lodash';
import { NextPage } from 'next';

import Logo from '@components/Logo';
import SearchBar from '@components/search';
import SearchService from 'app/apis/SearchService';

const Home: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSuggestions = useCallback(
    throttle(async (query: string) => {
      try {
        const res = await SearchService.getSuggestions(query);
        setSuggestions(res);
      } catch (e) {
        console.log(e);
      }
    }, 1000),
    [],
  );

  const handleOnChanged = (searchText: string, suggest?: boolean) => {
    setQuery(searchText);
    if (searchText.length === 0) {
      setSuggestions([]);
      return;
    }
    if (!suggest) return;
    throttledSuggestions(searchText);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <>
      <Head>
        <title>Timgiuptui | Home</title>
        <meta name="description" content="Search Vietnamese news" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Container textAlign="center" maxWidth="2xl" mt="25vh" height="100vh">
        <Box width="100%" display="flex" justifyContent="center" mb="5">
          <Logo width={256} height={100} />
        </Box>
        <Box as="form" onSubmit={handleSubmit}>
          <SearchBar onChanged={handleOnChanged} suggestions={suggestions} />
          <Button mt="5" type="submit">
            Tìm kiếm
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
