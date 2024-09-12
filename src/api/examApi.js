import { baseQuery } from "./api";

export const examApi = baseQuery.injectEndpoints({
  tagTypes: ["Exam"],
  endpoints: (builder) => ({
    getExam: builder.query({
      query: () => ({
        url: `/api/exams`,
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: ["Exam"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetExamQuery,

} = examApi;
