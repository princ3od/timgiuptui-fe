import React, { useCallback, useState } from 'react';

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
    <Container textAlign="center" maxWidth="2xl" mt="25vh" height="100vh">
      <Box width="100%" display="flex" justifyContent="center">
        <Logo width={256} height={100} />
      </Box>
      <Box as="form" onSubmit={handleSubmit}>
        <SearchBar onChanged={handleOnChanged} suggestions={suggestions} />
        <Button type="submit">Tìm kiếm</Button>
      </Box>
    </Container>
  );
};

export default Home;
