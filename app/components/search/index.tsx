import { SearchIcon } from "@chakra-ui/icons";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import React from "react";

interface Props {
  onSearchTextChange: (searchText: string) => void;
  onChanged?: (searchText: string) => void;
  initSearchText?: string;
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
        defaultValue={pageProps.initSearchText}
        onChange={(event) => pageProps.onSearchTextChange(event.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
