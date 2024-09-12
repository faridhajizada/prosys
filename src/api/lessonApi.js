import { baseQuery } from "./api";

export const lessonApi = baseQuery.injectEndpoints({
  tagTypes: ["Lessons"],
  endpoints: (builder) => ({
    getLesson: builder.query({
      query: () => ({
        url: `/api/lessons`,
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: ["Students"],
    }),
    addLesson: builder.mutation({
      query: (lessons) => ({
        url: `/api/lessons`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: lessons,
      }),
      invalidatesTags: ["Lessons"],
    }),
    deleteLesson: builder.mutation({
      query: (lessons) => ({
        url: `/api/lessons/${lessons}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Lessons"],
    }),
    editLesson: builder.mutation({
      query: (lessons) => ({
        url: `/api/lessons/${lessons.code}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: lessons,
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonQuery,
  useAddLessonMutation,
  useDeLessonMutation,
  useEditLessonMutation,
} = lessonApi;
