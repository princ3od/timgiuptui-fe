import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Box, Button, Flex, Select } from '@chakra-ui/react';
import { MultiValue, Select as MultiSelect } from 'chakra-react-select';
import { throttle } from 'lodash';
import { NextPage } from 'next';

import ArticleCard from '@components/article';
import SearchBar from '@components/search';
import PlatformService from 'app/apis/PlatformService';
import SearchService from 'app/apis/SearchService';
import Article from 'models/Article';
import { Order, SortBy } from 'models/enum';
import { SearchParams } from 'models/SearchQuery';
import Source from 'models/Source';
import Topic from 'models/Topic';

const SORT_BY_TYPES = [
  {
    name: 'Liên quan nhất',
    value: 'relevance',
  },
  {
    name: 'Mới nhất',
    value: 'newest',
  },
  {
    name: 'Cũ nhất',
    value: 'oldest',
  },
];

const Search: NextPage = () => {
  const router = useRouter();

  const [query, setQuery] = useState<string>('');
  const [searchParmas, setSearchParams] = useState<SearchParams>({
    sort_by: SortBy.relevance,
    order: Order.desc,
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');
  const [routerReady, setRouterReady] = useState<boolean>(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [allSouces, setAllSources] = useState<Source[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSeach = useCallback(
    throttle(async (query: string) => {
      try {
        const articles = await SearchService.searchArticles(query, searchParmas);
        setArticles(articles);
      } catch (e) {
        console.log(e);
      }
    }, 1400),
    [],
  );

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await PlatformService.getTopics();
      setAllTopics(topics);
    };
    const fetchSources = async () => {
      const sources = await PlatformService.getSources();
      setAllSources(sources);
    };
    fetchTopics();
    fetchSources();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const { q, order, sort_by = SortBy.relevance, sources, topics, offset, limit } = router.query;
    setQuery(q as string);
    const hasFilterTopic = topics && (topics as string).split(',').length > 0;
    const hasFilterSource = sources && (sources as string).split(',').length > 0;
    const validTopics =
      hasFilterTopic && (topics as string).split(',').filter((topic) => allTopics.find((t) => t.id === topic));
    const validSources =
      hasFilterSource && (sources as string).split(',').filter((source) => allSouces.find((s) => s.id === source));
    const params: SearchParams = {
      order: order as Order,
      sort_by: sort_by as SortBy,
      sources: validSources as string[],
      topics: validTopics as string[],
      offset: offset ? parseInt(offset as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    };
    setSearchParams(params);
    setRouterReady(true);
    const sort =sort_by === SortBy.relevance ? 'relevance' : order === Order.desc ? 'newest' : 'oldest';
    setSortBy(sort);
  }, [allSouces, allTopics, router.isReady, router.query]);

  const onQueryChanged = (q: string) => {
    setQuery(q);
    router.replace({
      pathname: '/search',
      query: {
        ...router.query,
        q,
      },
    });
    if (q === '') {
      setArticles([]);
      return;
    }
    throttledSeach(q);
  };

  const onSortByChanged = async (sortBy: 'relevance' | 'newest' | 'oldest') => {
    const updatedParams = {
      sort_by: sortBy === 'relevance' ? SortBy.relevance : SortBy.date,
      order: sortBy === 'oldest' ? Order.asc : Order.desc,
    };
    router.replace({
      pathname: '/search',
      query: {
        ...router.query,
        ...updatedParams,
      },
    });
    setSearchParams({
      ...searchParmas,
      ...updatedParams,
    });
    setSortBy(sortBy);
    const articles = await SearchService.searchArticles(query, {
      ...searchParmas,
      ...updatedParams,
    });
    setArticles(articles);
  };

  const onFilterTopicChanged = async (
    topics: MultiValue<{
      value: string;
      label: string | undefined;
    }>,
  ) => {
    const topicIds = topics.map((topic) => topic.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { topics: queryTopics, ...queryParam } = router.query;
    if (topicIds.length > 0) queryParam.topics = topicIds.join(',');
    router.replace({
      pathname: '/search',
      query: {
        ...queryParam,
      },
    });
    setSearchParams({
      ...searchParmas,
      topics: topicIds,
    });
    const articles = await SearchService.searchArticles(query, {
      ...searchParmas,
      topics: topicIds,
    });
    setArticles(articles);
  };

  const onFilterSourceChanged = async (
    sources: MultiValue<{
      value: string;
      label: string | undefined;
    }>,
  ) => {
    const sourceIds = sources.map((source) => source.value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { sources: querySources, ...queryParam } = router.query;
    if (sourceIds.length > 0) queryParam.sources = sourceIds.join(',');
    router.replace({
      pathname: '/search',
      query: {
        ...queryParam,
      },
    });
    setSearchParams({
      ...searchParmas,
      sources: sourceIds,
    });
    const articles = await SearchService.searchArticles(query, {
      ...searchParmas,
      sources: sourceIds,
    });
    setArticles(articles);
  };

  const showResult = query !== '' && articles.length > 0;

  return (
    <div className="page-container">
      <div className="content-container">
        <h1 className="search-title">Tìm giúp tui</h1>
        <div className="search-container">
          {routerReady && <SearchBar onChanged={onQueryChanged} initialQuery={query} />}
          <Button ml="28px">Tìm kiếm</Button>
        </div>

        <Flex justifyContent="space-between">
          <Box display="flex" gap="4" flexGrow="1" mr="8">
            <Box flex="0.5">
              <MultiSelect
                placeholder="Chủ đề"
                value={
                  searchParmas.topics &&
                  searchParmas.topics?.map((topic) => ({
                    value: topic,
                    label: allTopics.find((t) => t.id === topic)?.name,
                  }))
                }
                options={allTopics.map((topic) => ({ value: topic.id, label: topic.name }))}
                onChange={(topics) => onFilterTopicChanged(topics)}
                isMulti
                useBasicStyles
              />
            </Box>
            <Box flex="0.5">
              <MultiSelect
                placeholder="Nguồn báo"
                value={
                  searchParmas.sources &&
                  searchParmas.sources?.map((source) => ({
                    value: source,
                    label: allSouces.find((s) => s.id === source)?.name,
                  }))
                }
                options={allSouces.map((source) => ({ value: source.id, label: source.name }))}
                onChange={(sources) => onFilterSourceChanged(sources)}
                isMulti
                useBasicStyles
              />
            </Box>
          </Box>

          <Box>
            <Select
              value={sortBy}
              onChange={(e) => onSortByChanged(e.target.value as 'relevance' | 'newest' | 'oldest')}
            >
              {SORT_BY_TYPES.map(({ value, name }) => (
                <option key={value} value={value}>
                  {name}
                </option>
              ))}
            </Select>
          </Box>
        </Flex>
        <div className="search-content">
          {showResult &&
            articles.map((article) => <ArticleCard query={query} article={article} key={`${article.id}`} />)}
        </div>
      </div>
    </div>
  );
};

export default Search;
