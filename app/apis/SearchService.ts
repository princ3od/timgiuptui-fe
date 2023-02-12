import { ApiEnpoints } from '@constants/api';
import Article from 'models/Article';
import { SearchParams, LooseParams } from 'models/SearchQuery';

import HttpClient from './HttpClient';

const SearchService = {
  searchArticles: async (q: string, searchParams: SearchParams) => {
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
          q,
          ...params,
        },
      });
      const { data } = response;
      const { results } = data;
      return results as Article[];
    } catch (e) {
      return [];
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
