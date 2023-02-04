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
import ArticleService from "app/apis/ArticleService";
import Article from "models/Article";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
export default function Search() {
  const router = useRouter();
  const { searchText } = router.query;
  const articleService = ArticleService;
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    articleService.searchArticles(searchText as string).then((res) => {
      setArticles(res);
    });
  }, [articleService, searchText]);

  const sourcesOptionBuilder = (articles: Article[]) => {
    let sources: string[] = [];
    articles.forEach((article) => {
      if (!sources.includes(article.source)) {
        sources.push(article.source);
      }
    });
    return sources.map((source) => {
      return (
        <option value={source} key={source}>
          {source}
        </option>
      );
    });
  };

  const topicsOptionBuilder = (articles: Article[]) => {
    let topics: string[] = [];
    articles.forEach((article) => {
      if (!topics.includes(article.topic)) {
        topics.push(article.topic);
      }
    });
    return topics.map((topic) => {
      return (
        <option value={topic} key={topic}>
          {topic}
        </option>
      );
    });
  };

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
              {sourcesOptionBuilder(articles)}
            </Select>
            <Box w="19px"></Box>
            <Select placeholder="Chủ đề">
              {topicsOptionBuilder(articles)}
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
        <div className="search-content">
          {articles.map((article) => {
            return (
              <ArticleCard
                article={article}
                key={`${article.id}`}
              ></ArticleCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
