import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { categoriesApi, catalogApi, mainApi, catalogRandomApi } from "../api";
import search from "./reducers/searchSlice";
import innerWidth from "./reducers/innerWidthSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducer = combineReducers({
  [categoriesApi.reducerPath]: categoriesApi.reducer,
  [catalogApi.reducerPath]: catalogApi.reducer,
  [mainApi.reducerPath]: mainApi.reducer,
  [catalogRandomApi.reducerPath]: catalogRandomApi.reducer,
  search,
  innerWidth,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(categoriesApi.middleware)
      .concat(catalogApi.middleware)
      .concat(mainApi.middleware)
      .concat(catalogRandomApi.middleware),
});

setupListeners(store.dispatch);
