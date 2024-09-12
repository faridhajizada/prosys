import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { studentApi } from "../api/studentApi";
import { lessonApi } from "../api/lessonApi";
import { examApi } from "../api/examApi";

const store = configureStore({
  reducer: {
    [studentApi.reducerPath]: studentApi.reducer,
    [lessonApi.reducerPath]: lessonApi.reducer,
    [examApi.reducerPath]: examApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(studentApi.middleware, lessonApi.middleware, examApi.middleware),

});

setupListeners(store.dispatch);
export default store;
