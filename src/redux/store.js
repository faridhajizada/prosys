import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { studentApi } from "../api/studentApi";
import { lessonApi } from "../api/lessonApi";

const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware),
});

setupListeners(store.dispatch);
export default store;
