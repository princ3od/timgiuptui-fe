import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Image,
  Tag,
  HStack,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import ArticleCard from "@components/article";
import SearchBar from "@components/search";
import { useRouter } from "next/router";
import articles from "../../mock/articles";
export default function Search() {
  const router = useRouter();
  const { searchText } = router.query;
  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="search-title">Tìm giúp tui</h1>
        <div className="search-container">
          <SearchBar
            onSearchTextChange={function (searchText: string): void {}}
            initSearchText={searchText as string}
          ></SearchBar>
          <Button
            colorScheme="black"
            size="md"
            variant="none"
            className="button-find"
            ml="32px"
          >
            <h3>Tìm kiếm</h3>
          </Button>
        </div>

        <div className="filter-container">
          <Box display="flex">
            <Select placeholder="Nguồn báo">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <Box w="19px"></Box>
            <Select placeholder="Chủ đề">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>

          <Box>
            <Select placeholder="Liên quan">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
          </Box>
        </div>

        <ArticleCard article={articles[0]}></ArticleCard>
        <ArticleCard article={articles[0]}></ArticleCard>
        <ArticleCard article={articles[0]}></ArticleCard>
        <ArticleCard article={articles[0]}></ArticleCard>
      </div>
    </div>
  );
}
