import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.timeout = 12000;
axios.defaults.baseURL = "https://api.timgiuptui.com/";



const HttpClient = {
  get: async (path: string, { needAuthenticated = false, params = {} } = {}): Promise<AxiosResponse> => {
    return axios.get(path, {  params });
  },
  post: async (path: string, { data = {}, needAuthenticated = true, params = {} } = {}): Promise<AxiosResponse> => {
 
    return axios.post(path, data, { params });
  },
  put: async (path: string, { data = {}, needAuthenticated = true, params = {} } = {}): Promise<AxiosResponse> => {
    
    return axios.put(path, data, { params });
  },
  delete: async (path: string, { needAuthenticated = true, params = {} } = {}): Promise<AxiosResponse> => {
   
    return axios.delete(path, {  params });
  },
  patch: async (path: string, { data = {}, needAuthenticated = true, params = {} } = {}): Promise<AxiosResponse> => {

    return axios.patch(path, data, { params });
  },
};

export default HttpClient;
