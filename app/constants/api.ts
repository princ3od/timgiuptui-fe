export const ApiEnpoints = {
  articles: {
    default: '/articles',
    search: '/articles/search',
    autocomplete: (query: string) => `/articles/autocomplete?q=${query}`,
  },
  topics: {
    default: () => '/',
    getTopic: () => '/topics',
    getSources: () => '/editors',
  },
};
