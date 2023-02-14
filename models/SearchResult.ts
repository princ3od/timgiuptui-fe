import Article from './Article';

export interface SearchResult {
  count: number;
  results: Array<Article>;
  has_more: boolean;
}
