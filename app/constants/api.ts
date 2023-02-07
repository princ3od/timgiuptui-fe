export const ApiEnpoints = {

  articles:{
    default: () => '/articles',
    search: (query: string) => `/articles/search?q=${query}`,
    autocomplete: (query: string) => `/articles/autocomplete?q=${query}`,
  },
  topics:{
    default: () => '/',
    getTopic:() => '/topics',
    getSources:() => '/editors',
  }
};
