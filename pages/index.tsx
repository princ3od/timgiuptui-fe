import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { Button, Container } from '@chakra-ui/react';
import { throttle } from 'lodash';

import SearchBar from '@components/search';
import SearchService from 'app/apis/SearchService';

export default function Home() {
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
    }, 1200),
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

  const handleSubmit = () => {
    router.push(`/search?q=${query}`);
  };

  return (
    <Container as="main" textAlign="center" maxWidth="2xl" mt="25vh" height="100vh">
      <h1>Tìm giúp tui</h1>
      <form onSubmit={handleSubmit}>
        <SearchBar onChanged={handleOnChanged} onSubmitted={handleSubmit} suggestions={suggestions} />
        <Button tabIndex={10} type="submit">
          Tìm kiếm
        </Button>
      </form>
    </Container>
  );
}
