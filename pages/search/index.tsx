import { useCallback, useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { Box, Button, Container, Flex, Select, Skeleton, SlideFade } from '@chakra-ui/react';
import { MultiValue, Select as MultiSelect } from 'chakra-react-select';
import { throttle } from 'lodash';
import { NextPage } from 'next';

import ArticleCard from '@components/article';
import ArticleLoading from '@components/ArticleLoading';
import Logo from '@components/Logo';
import NoMoreResult from '@components/NoMoreResult';
import NoResult from '@components/NoResult';
import ScrollToTopButton from '@components/ScrollToTopButton';
import SearchBar from '@components/search';
import PlatformService from 'app/apis/PlatformService';
import SearchService from 'app/apis/SearchService';
import Article from 'models/Article';
import { Order, SortBy } from 'models/enum';
import { LooseParams, SearchParams } from 'models/SearchQuery';
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

  const [searchParmas, setSearchParams] = useState<SearchParams>({ q: '' });
  const [sortBy, setSortBy] = useState<'relevance' | 'newest' | 'oldest'>('relevance');
  const [articles, setArticles] = useState<Article[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [allSouces, setAllSources] = useState<Source[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [routerReady, setRouterReady] = useState<boolean>(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledSeach = useCallback(
    throttle(async (params: SearchParams) => {
      setIsLoading(true);
      try {
        if (params.q === '') return;
        const response = await SearchService.searchArticles(params);
        if (params.offset && params.offset > 0) {
          setArticles((prev) => [...prev, ...response.results]);
        } else {
          setArticles(response.results);
        }
        setHasMore(response.has_more);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
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
    if (!router.isReady || allSouces.length === 0 || allTopics.length === 0) return;
    const { q, order, sort_by, sources, topics, offset, limit } = router.query;
    const hasFilterTopic = topics && (topics as string).split(',').length >= 0;
    const hasFilterSource = sources && (sources as string).split(',').length >= 0;
    const validTopics =
      hasFilterTopic && (topics as string).split(',').filter((topic) => allTopics.find((t) => t.id === topic));
    const validSources =
      hasFilterSource && (sources as string).split(',').filter((source) => allSouces.find((s) => s.id === source));
    const params: SearchParams = { q: q as string };
    if (!q) {
      setRouterReady(true);
      return;
    }
    if (validTopics) params.topics = validTopics;
    if (validSources) params.sources = validSources;
    if (offset) params.offset = Number(offset);
    if (limit) params.limit = Number(limit);
    if (order) params.order = order as Order;
    if (sort_by) params.sort_by = sort_by as SortBy;
    setSearchParams(params);
    if (sort_by) {
      const sort = sort_by === SortBy.relevance ? 'relevance' : order === Order.desc ? 'newest' : 'oldest';
      setSortBy(sort);
    }
    setRouterReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSouces, allTopics, router.isReady]);

  useEffect(() => {
    if (searchParmas.q === '') {
      setArticles([]);
      return;
    }
    const { topics, sources, ...rest } = searchParmas;
    const queryParams: LooseParams = { ...rest };
    if (topics) queryParams.topics = topics.join(',');
    if (sources) queryParams.sources = sources.join(',');
    router.replace({
      pathname: '/search',
      query: {
        ...queryParams,
      },
    });
    throttledSeach(searchParmas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParmas]);

  const onQueryChanged = (q: string) => {
    if (q === '') setArticles([]);
    const params: LooseParams = { q };
    const { order, sort_by } = searchParmas;
    if (order) params.order = order;
    if (sort_by) params.sort_by = sort_by;
    setSearchParams(params as SearchParams);
  };

  const onSortByChanged = async (sortBy: 'relevance' | 'newest' | 'oldest') => {
    const updatedParams = {
      sort_by: sortBy === 'relevance' ? SortBy.relevance : SortBy.date,
      order: sortBy === 'oldest' ? Order.asc : Order.desc,
    };
    setSearchParams({
      ...searchParmas,
      ...updatedParams,
    });
    setSortBy(sortBy);
  };

  const onFilterTopicChanged = async (
    topics: MultiValue<{
      value: string;
      label: string | undefined;
    }>,
  ) => {
    const topicIds = topics.map((topic) => topic.value);
    setSearchParams((params) => ({
      ...params,
      topics: topicIds.length > 0 ? topicIds : undefined,
    }));
  };

  const onFilterSourceChanged = async (
    sources: MultiValue<{
      value: string;
      label: string | undefined;
    }>,
  ) => {
    const sourceIds = sources.map((source) => source.value);
    setSearchParams({
      ...searchParmas,
      sources: sourceIds.length > 0 ? sourceIds : undefined,
    });
  };

  const loadMore = async () => {
    setIsLoadingMore(true);
    const response = await SearchService.searchArticles({
      ...searchParmas,
      offset: articles.length,
    });
    setArticles((prev) => [...prev, ...response.results]);
    setHasMore(response.has_more);
    setIsLoadingMore(false);
  };

  const showResult = searchParmas.q !== '' && articles.length > 0 && !isLoading;
  const noResult = searchParmas.q !== '' && articles.length === 0;

  return (
    <>
      <Head>
        <title>Timgiuptui | Search</title>
        <meta name="description" content="Search Vietnamese news" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Container maxWidth="4xl">
        <Logo />
        <div className="search-container">
          <Skeleton isLoaded={routerReady} w="100%" height="48px" borderRadius="8px" my="5">
            <SearchBar onChanged={onQueryChanged} initialQuery={searchParmas.q} disabled={!routerReady} />
          </Skeleton>
          <Button ml="28px" isLoading={isLoading}>
            Tìm kiếm
          </Button>
        </div>

        <Flex justifyContent="space-between">
          <Box display="flex" gap="4" flexGrow="1" mr="8">
            <Box flex="0.5">
              <MultiSelect
                placeholder="Chủ đề"
                isDisabled={allTopics.length === 0}
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
                isDisabled={allSouces.length === 0}
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
              disabled={articles.length === 0}
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
          {articles.map((article, index) => (
            <SlideFade
              in={showResult && articles.findIndex((a) => a.id === article.id) !== -1}
              unmountOnExit
              offsetY="20px"
              key={`${article.id}`}
              transition={{ enter: { duration: 0.2, delay: (index % 10) * 0.18 } }}
            >
              <ArticleCard query={searchParmas.q} article={article} key={`${article.id}`} />
            </SlideFade>
          ))}
          <SlideFade unmountOnExit in={isLoading || noResult} offsetY="20px">
            {isLoading ? (
              [...Array(2)].map((_, index) => <ArticleLoading key={index} />)
            ) : (
              <SlideFade unmountOnExit in={noResult} offsetY="20px">
                <NoResult />
              </SlideFade>
            )}
          </SlideFade>
          <Box textAlign="center">
            <SlideFade unmountOnExit in={showResult} offsetY="20px">
              {hasMore ? (
                <Button mt="6" onClick={loadMore} isLoading={isLoadingMore}>
                  Xem thêm
                </Button>
              ) : (
                <NoMoreResult />
              )}
            </SlideFade>
          </Box>
          {showResult && <ScrollToTopButton />}
        </div>
      </Container>
    </>
  );
};

export default Search;
