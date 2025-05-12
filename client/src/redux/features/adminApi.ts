import { apiSlice } from "./api/apiSlice";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDestination: builder.mutation({
      query: (formData) => ({
        url: "/create-destination",
        method: "POST",
        body: formData, // Pass raw FormData here
        credentials: "include" as const,
      }),
    }),

    updateDestination: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/update-destination/${id}`,
        method: "PATCH",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    addExperience: builder.mutation({
      query: (formData) => ({
        url: "/create-experience",
        method: "POST",
        body: formData, // Pass raw FormData here
        credentials: "include" as const,
      }),
    }),

    updateExperience: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/update-experience/${id}`,
        method: "PATCH",
        body: formData,
        credentials: "include" as const,
      }),
    }),

    addHiddenGems: builder.mutation({
      query: (formData) => ({
        url: "/create-hiddengem",
        method: "POST",
        body: formData, // Pass raw FormData here
        credentials: "include" as const,
      }),
    }),

    updateHiddengems: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/update-hiddengem/${id}`,
        method: "PATCH",
        body: formData,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddDestinationMutation,
  useUpdateDestinationMutation,
  useAddExperienceMutation,
  useUpdateExperienceMutation,
  useAddHiddenGemsMutation,
  useUpdateHiddengemsMutation,
} = adminApi;
