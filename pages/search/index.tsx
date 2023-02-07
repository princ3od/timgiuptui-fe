import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Button, Select } from "@chakra-ui/react";
import ArticleCard from "@components/article";
import SearchBar from "@components/search";
import PlatformService from "app/apis/PlatformService";
import SearchService from "app/apis/SearchService";

import Article from "models/Article";
import Source from "models/Source";
import Topic from "models/Topic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function Search() {
  const router = useRouter();
  const { searchText } = router.query;
  const [searchTextState, setSearchText] = useState<string>(
    searchText as string
  );
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const pageLimit = 5;
  const articlePerPage = 10;
  const [topics, setTopics] = useState<Topic[]>([]);
  const [source, setSource] = useState<Source[]>([]);

  useEffect(() => {
    const getSource = async () => {
      const res = await PlatformService.getSources();
      setSource(res);
    };

    const getTopic = async () => {
      const res = await PlatformService.getTopics();
      setTopics(res);
    };

    const getArticles = async () => {
      const res = await SearchService.searchArticles(searchTextState as string);
      const { results, hasMoreArticle } = res;
      if (hasMore != hasMoreArticle) {
        setHasMore(hasMoreArticle);
      }
      setArticles((results ?? []) as Article[]);
    };
    getSource();
    getTopic();
    getArticles();
  }, [searchTextState, hasMore]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const sourcesOptionBuilder = (sources: Source[]) => {
    let sourcesOption: string[] = [];
    sources.forEach((source) => {
      if (!sourcesOption.includes(source.name)) {
        sourcesOption.push(source.name);
      }
    });

    return sourcesOption.map((source) => {
      return (
        <option value={source} key={source}>
          {source}
        </option>
      );
    });
  };
  const handleSearchTextChange = (newText: string) => {
    if (newText !== searchTextState) {
      setSearchText(newText);
      setPage(1);
      router.push(`/search?searchText=${newText}`);
    }
  };

  const topicsOptionBuilder = (topicArray: Topic[]) => {
    let topicsOption: string[] = [];
    topicArray.forEach((topic) => {
      if (!topicsOption.includes(topic.name)) {
        topicsOption.push(topic.name);
      }
    });
    return topicsOption.map((topic) => {
      return (
        <option value={topic} key={topic}>
          {topic}
        </option>
      );
    });
  };

  const buildPagination = (pageCount: number, pageLimit: number) => {
    let pagination = [];
    for (let i = 1; i <= pageLimit && i <= pageCount; i++) {
      pagination.push(
        <Button
          colorScheme="black"
          size="md"
          variant="outline"
          className="button-page"
          onClick={() => setPage(i)}
          {...(i === page ? { backgroundColor: "#52b6e7" } : {})}
        >
          <h3>{i}</h3>
        </Button>
      );
    }
    return pagination;
  };
  const buildRelevantSearch = () => {
    const relevantSearch: string[] = ["Liên quan", "Mới nhất ", "Cũ nhất"];
    return relevantSearch.map((search) => {
      return (
        <option key={search} value={search}>
          {search}
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
            onSearchTextChange={handleSearchTextChange}
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
              {sourcesOptionBuilder(source)}
            </Select>
            <Box w="19px"></Box>
            <Select placeholder="Chủ đề">{topicsOptionBuilder(topics)}</Select>
          </Box>

          <Box>
            <Select placeholder="Liên quan">{buildRelevantSearch()}</Select>
          </Box>
        </div>
        <div className="search-content">
          {articles
            .slice((page - 1) * articlePerPage, page * articlePerPage)
            .map((article) => {
              return (
                <ArticleCard
                  article={article}
                  key={`${article.id}`}
                ></ArticleCard>
              );
            })}
        </div>

        <div className="pagination">
          <Button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          >
            <ChevronLeftIcon />
          </Button>
          {buildPagination(articles.length / articlePerPage, pageLimit)}
          <Button
            onClick={() => {
              if (page < articles.length / articlePerPage) {
                setPage(page + 1);
              }
            }}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}

Search.getInitialProps = async (ctx: { query: { searchText: string } }) => {
  const { searchText } = ctx.query;
  return { searchText };
};

export default Search;
