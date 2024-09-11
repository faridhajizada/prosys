import { baseQuery } from "./api";

export const studentApi = baseQuery.injectEndpoints({
  tagTypes: ["Students"],
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: `/api/students`,
        headers: {
          Accept: "application/json",
        },
      }),
      providesTags: ["Students"],
    }),
    addStudent: builder.mutation({
      query: (student) => ({
        url: `/api/students`,
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStudentsQuery, useAddStudentMutation } = studentApi;
