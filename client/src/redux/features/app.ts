import { apiSlice } from "./api/apiSlice";

export const apiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDestinations: builder.query({
      query: ({ page, limit, search, lat, long }) => ({
        url: `/get-destinations?page=${page}&limit=${limit}&search=${search}&lat=${lat}&long=${long}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getDestination: builder.query({
      query: ({ destinationId }) => ({
        url: `/destination/${destinationId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getAllExperiences: builder.query({
      query: ({ page, limit, search }) => ({
        url: `/get-experiences?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getExperience: builder.query({
      query: ({ experienceId }) => ({
        url: `/experience/${experienceId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getHiddenGems: builder.query({
      query: ({ page, limit, search, lat, long }) => ({
        url: `/get-hiddengem?page=${page}&limit=${limit}&search=${search}&lat=${lat}&long=${long}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getHiddenGem: builder.query({
      query: ({ destinationId }) => ({
        url: `/hiddengem/${destinationId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllDestinationsQuery,
  useGetDestinationQuery,
  useGetAllExperiencesQuery,
  useGetExperienceQuery,
  useGetHiddenGemQuery,
  useGetHiddenGemsQuery
} = apiApi;
