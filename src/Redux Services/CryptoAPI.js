import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

const cryptoHeaders = {
    'X-RapidAPI-Host': process.env.REACT_APP_COINAPI_Host,
    'X-RapidAPI-Key': process.env.REACT_APP_COINAPI_KEY
  }
const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: cryptoHeaders})

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getALLCryptos: builder.query({
      query: (variable) => createRequest(`/coins?limit=${variable}`),
    }),
    getCrypto: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`coin/Qwsogvtv82FCd/exchanges`),
    }),
    getCoinHistory: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}/history`),
    }),
  }),
})

export const { 
    useGetALLCryptosQuery,
    useGetCryptoQuery,
    useGetExchangesQuery,
    useGetCoinHistoryQuery
} = cryptoApi


