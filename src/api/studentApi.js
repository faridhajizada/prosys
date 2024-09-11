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
  }),
  overrideExisting: false,
});

export const { useGetStudentsQuery } = studentApi;
