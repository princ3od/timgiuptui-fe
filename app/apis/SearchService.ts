import { ApiEnpoints } from '@constants/api';
import { SearchParams, LooseParams } from 'models/SearchQuery';
import { SearchResult } from 'models/SearchResult';

import HttpClient from './HttpClient';

const SearchService = {
  searchArticles: async (searchParams: SearchParams) => {
    const { sources, topics, ...rest } = searchParams;

    const params: LooseParams = rest;

    if (sources && sources.length > 0) {
      params.sources = sources.join(',');
    }

    if (topics && topics.length > 0) {
      params.topics = topics.join(',');
    }

    try {
      const response = await HttpClient.get(ApiEnpoints.articles.search, {
        params: {
          ...params,
        },
      });
      const { data } = response;
      return data as SearchResult;
    } catch (e) {
      return {
        count: 0,
        results: [],
        has_more: false,
      } as SearchResult;
    }
  },

  getSuggestions: async (query: string) => {
    try {
      const response = await HttpClient.get(ApiEnpoints.articles.autocomplete(query));
      const { data } = response;
      return data as string[];
    } catch (e) {
      return [];
    }
  },
};

export default SearchService;
