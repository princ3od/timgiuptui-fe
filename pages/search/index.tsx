import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Select } from '@chakra-ui/react';

import ArticleCard from '@components/article';
import SearchBar from '@components/search';
import PlatformService from 'app/apis/PlatformService';
import SearchService from 'app/apis/SearchService';
import Article from 'models/Article';
import Source from 'models/Source';
import Topic from 'models/Topic';
export default function Search() {
  const router = useRouter();

  const { searchText } = router.query;

  const [searchTextState, setSearchText] = useState<string>(
    searchText as string
  );
  const searchArticleService = SearchService;
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const pageLimit = 5;
  const articlePerPage = 10;

  const platformService = PlatformService;
  const [topics, setTopics] = useState<Topic[]>([]);

  const [source, setSource] = useState<Source[]>([]);

  useEffect(() => {
    platformService.getSources().then((res) => {
      setSource(res);
    });
  }, [platformService]);

  useEffect(() => {
    platformService.getTopics().then((res) => {
      setTopics(res);
    });
  }, [platformService]);

  useEffect(() => {
    searchArticleService
      .searchArticles(searchTextState as string)
      .then((res) => {
        setArticles(res);
      });
  }, [searchTextState, searchArticleService]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const sourcesOptionBuilder = (sources: Source[]) => {
    const sourcesOption: string[] = [];
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
    }
  };

  const topicsOptionBuilder = (topicArray: Topic[]) => {
    const topicsOption: string[] = [];
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
    const pagination = [];
    for (let i = 1; i <= pageLimit && i <= pageCount; i++) {
      pagination.push(
        <Button
          colorScheme="black"
          size="md"
          variant="outline"
          className="button-page"
          onClick={() => setPage(i)}
          {...(i === page ? { backgroundColor: '#52b6e7' } : {})}
        >
          <h3>{i}</h3>
        </Button>
      );
    }
    return pagination;
  };

  const buildRelevantSearch = () => {
    const relevantSearch: string[] = ['Liên quan', 'Mới nhất ', 'Cũ nhất'];
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
