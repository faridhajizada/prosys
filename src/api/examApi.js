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
    addExam: builder.mutation({
      query: (body) => ({
        url: `/api/exams`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Exam"],
    }),
    deleteExam: builder.mutation({
      query: ({ lessonCode, studentNumber }) => ({
        url: `/api/exams/${lessonCode}/${studentNumber}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Exam"],
    }),
    editExam: builder.mutation({
      query: (body) => ({
        url: `/api/exams/${body.lessonCode}/${body.studentNumber}`,
        method: "PUT",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Exam"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetExamQuery,
  useAddExamMutation,
  useDeleteExamMutation,
  useEditExamMutation,

} = examApi;
