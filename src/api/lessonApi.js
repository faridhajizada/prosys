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
      providesTags: ["Lessons"],
    }),
    addLesson: builder.mutation({
      query: (lesson) => ({
        url: `/api/lessons`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: lesson,
      }),
      invalidatesTags: ["Lessons"],
    }),
    deleteLesson: builder.mutation({
      query: (lessonCode) => ({
        url: `/api/lessons/${lessonCode}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Lessons"],
    }),
    editLesson: builder.mutation({
      query: (lesson) => ({
        url: `/api/lessons/${lesson.code}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: lesson,
      }),
      invalidatesTags: ["Lessons"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLessonQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
  useEditLessonMutation,
} = lessonApi;
