import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import ArticleCard from "@components/article";
import SearchBar from "@components/search";
import { useRouter } from "next/router";
import articles from "../../mock/articles";
export default function Search() {
  const router = useRouter();
  const { searchText } = router.query;
  return (
    <div
      style={{
        textAlign: "left",
        margin: "10%",
        padding: "auto",
      }}
    >
      <h1>Tìm giúp tui</h1>
      <div
        style={{
          display: "flex",

          alignItems: "center",
        }}
      >
        <Box w="600px">
          <SearchBar
            onSearchTextChange={function (searchText: string): void {}}
          ></SearchBar>
        </Box>
        <Button
          colorScheme="black"
          size="md"
          variant="outline"
          className="button-find"
          ml="32px"
        >
          <h3>Tìm kiếm</h3>
        </Button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
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
    </div>
  );
}
