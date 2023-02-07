
import { ApiEnpoints } from '@constants/api';
import Article from 'models/Article';


import HttpClient from './HttpClient';
const limit = 50;
const offset = 0;
const sort_by = "relevance";
const order = "desc";

const SearchService = {

    searchArticles: async (searchText: string) => {

        try {
            let query = `${searchText}&limit=${limit}&offset=${offset}&sort_by=${sort_by}&order=${order}`
            const response = await HttpClient.get(ApiEnpoints.articles.search(query));
            const { data } = response;
          return data;
        } catch (e) {
            return [];
        }
    },
};

export default SearchService;
