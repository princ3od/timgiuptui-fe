import React, { useState } from 'react';

import Router from 'next/router';

import { Button } from '@chakra-ui/react';

import SearchBar from '@components/search';

export default function Home() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = (searchText: string) => {
    Router.push(`/search?searchText=${searchText}`);
  };

  return (
    <div className="center-box">
      <h1>Tìm giúp tui</h1>
      <SearchBar onSearchTextChange={setSearchText}></SearchBar>
      <Button
        colorScheme="black"
        size="md"
        variant="outline"
        className="button-find"
        onClick={() => handleSearch(searchText)}
      >
        <h3>Tìm kiếm</h3>
      </Button>
    </div>
  );
}
