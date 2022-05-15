import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";

const newsHeaders = {
    'X-BingApis-SDK': process.env.REACT_APP_NEWSAPI_SDK,
    'X-RapidAPI-Host': process.env.REACT_APP_NEWSAPI_Host,
    'X-RapidAPI-Key': process.env.REACT_APP_NEWSAPI_Key
  }
const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: newsHeaders})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getNews: builder.query({
          query: ({cryptocurrency, count}) => createRequest(`https://bing-news-search1.p.rapidapi.com/news/search?q=${cryptocurrency}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`),
        }),
    })
})
export const { 
  useGetNewsQuery
} = newsApi