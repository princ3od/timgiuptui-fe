export const ApiEnpoints = {

  articles:{
    default: () => `/articles`,
    search: (query: string) => `/articles/search?q=${query}`,
  },
  topics:{
    default: () => `/`,
    getTopic:() => "/topics",
    getSources:() => "/editors",
  }
};
