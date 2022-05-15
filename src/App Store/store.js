import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../Redux Services/CryptoAPI";
import { newsApi } from "../Redux Services/NewsApi";

export default configureStore ({
    reducer: {
        [cryptoApi.reducerPath] : cryptoApi.reducer,
        [newsApi.reducerPath] : newsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware, newsApi.middleware)
    
})