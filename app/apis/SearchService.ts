import { ApiEnpoints } from '@constants/api';

import HttpClient from './HttpClient';

const limit = 50;
const offset = 0;
const sort_by = 'relevance';
const order = 'desc';

const SearchService = {
  searchArticles: async (searchText: string) => {
    try {
      const query = `${searchText}&limit=${limit}&offset=${offset}&sort_by=${sort_by}&order=${order}`
      const response = await HttpClient.get(ApiEnpoints.articles.search(query));
      const { data } = response;
      return data;
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
  }
};

export default SearchService;
