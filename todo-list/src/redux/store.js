import { configureStore } from "@reduxjs/toolkit";
import api from "./api";

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddlewares) => {
        return getDefaultMiddlewares().concat(api.middleware);
    },
    devTools: !import.meta.env.PROD,
});

export default store;