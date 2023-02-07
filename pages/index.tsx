import { Button } from "@chakra-ui/react";
import SearchBar from "@components/search";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e: any) => {
    e.preventDefault();
    router.push(`/search?searchText=${searchText}`);
  };

  return (
    <div className="center-box">
      <h1>Tìm giúp tui</h1>
      <form onSubmit={handleSearch}>
        <SearchBar onSearchTextChange={setSearchText} />
        <Button colorScheme="black" size="md" variant="outline" className="button-find" type="submit">
          Tìm kiếm
        </Button>
      </form>
    </div>
  );
}
