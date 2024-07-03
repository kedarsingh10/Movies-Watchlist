import { MOVIES_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const moviesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ pageNumber }) => ({
        url: MOVIES_URL,
        params: { pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Movie"],
    }),
    getMovieById: builder.query({
      query: (movieId) => ({
        url: `${MOVIES_URL}/${movieId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Movie"],
    }),
    updateMovieById: builder.mutation({
      query: (data) => ({
        url: `${MOVIES_URL}/${data.movieId}`,
        method: "PUT",
        body: data,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Movie"],
    }),
    deleteMovieById: builder.mutation({
      query: (movieId) => ({
        url: `${MOVIES_URL}/${movieId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movie"],
    }),
    addMovie: builder.mutation({
      query: (data) => ({
        url: MOVIES_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useUpdateMovieByIdMutation,
  useDeleteMovieByIdMutation,
  useAddMovieMutation,
} = moviesApiSlice;
