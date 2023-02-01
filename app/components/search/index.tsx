import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";

interface Props {
  onSearchTextChange: (searchText: string) => void;
}

const SearchBar = (pageProps: Props) => {
  return (
    <InputGroup my="20px" className="search-bar">
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        type="search"
        placeholder="Enter search text here.."
        size="lg"
        onChange={(event) => pageProps.onSearchTextChange(event.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
