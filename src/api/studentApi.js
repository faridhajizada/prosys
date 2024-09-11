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
          "Content-Type": "application/json",
        },
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation({
      query: (studentNumber) => ({
        url: `/api/students/${studentNumber}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }),
      invalidatesTags: ["Students"],
    }),
    editStudent: builder.mutation({
      query: (student) => ({
        url: `/api/students/${student.number}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentsQuery,
  useAddStudentMutation,
  useDeleteStudentMutation,
  useEditStudentMutation,
} = studentApi;
