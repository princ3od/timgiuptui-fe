
import { ApiEnpoints } from '@constants/api';
import Article from 'models/Article';


import HttpClient from './HttpClient';

const ArticleService = {

    searchArticles: async (query: string) => {
        try {
      
            const response = await HttpClient.get(ApiEnpoints.articles.search(query));
            const { data } = response;
            const { results } = data;
            return results as Article[];
          
        } catch (e) {
            return [];
        }
    },
};

export default ArticleService;
