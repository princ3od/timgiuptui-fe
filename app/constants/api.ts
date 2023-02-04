export const ApiEnpoints = {

  articles:{
    default: () => `/articles`,
    search: (query: string) => `/articles/search?q=${query}`,
  }
};
