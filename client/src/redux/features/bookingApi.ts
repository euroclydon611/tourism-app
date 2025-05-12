import { apiSlice } from "./api/apiSlice";

export const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBooking: builder.mutation({
      query: (payload) => ({
        url: "/create-booking",
        method: "POST",
        body: payload,
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
    getBookings: builder.query({
      query: ({ page, limit, search, userId }) => ({
        url: `/get-bookings?page=${page}&limit=${limit}&search=${search}&userId=${userId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddBookingMutation,
  useUpdateDestinationMutation,
  useGetBookingsQuery,
} = bookingApi;
