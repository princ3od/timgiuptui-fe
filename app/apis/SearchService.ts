
import { ApiEnpoints } from '@constants/api';
import Article from 'models/Article';

import HttpClient from './HttpClient';

const SearchService = {

  searchArticles: async (searchText: string) => {
    const limit = 50;
    const offset = 0;
    const sort_by = 'relevance';
    const order = 'desc';
    try {
      const query = `${searchText}&limit=${limit}&offset=${offset}&sort_by=${sort_by}&order=${order}`
      const response = await HttpClient.get(ApiEnpoints.articles.search(query));
      const { data } = response;
      const { results } = data;
      return results as Article[];
          
    } catch (e) {
      return [];
    }
  },
};

export default SearchService;
