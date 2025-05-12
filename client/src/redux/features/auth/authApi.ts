import { apiSlice } from "../api/apiSlice";
import { userRegistration, userLogin, userLogout } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type LoginResponse = {
  user: any;
  accessToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // enpoints here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userRegistration({
              token: results.data.activationToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token }) => ({
        url: "activate-user",
        method: "POST",
        body: { activation_token },
      }),
    }),
    login: builder.mutation<LoginResponse, any>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: { email: data.email, password: data.password },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: results.data.accessToken,
              user: results.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    socialAuth: builder.mutation<LoginResponse, any>({
      query: ({ email, name, avatar }) => ({
        url: "social-auth",
        method: "POST",
        body: { email, name, avatar },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const results = await queryFulfilled;
          dispatch(
            userLogin({
              accessToken: results.data.accessToken,
              user: results.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userLogout());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    //update user information
    updateUserInfo: builder.mutation({
      query: ({ name, email, phoneNumber, password }) => ({
        url: "/update-user",
        method: "PUT",
        body: { name, email, phoneNumber, password },
        credentials: "include" as const,
      }),
    }),

    //update user addresses
    updateUserAddress: builder.mutation({
      query: ({
        region,
        city,
        address1,
        address2,
        ghanaPost,
        addressType,
      }) => ({
        url: "/update-user-addresses",
        method: "PUT",
        body: { region, city, address1, address2, ghanaPost, addressType },
        credentials: "include" as const,
      }),
    }),
    //update user addresses
    deleteUserAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/delete-user-address/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useActivationMutation,
  useLoginMutation,
  useSocialAuthMutation,
  useLogoutMutation,
  useUpdateUserInfoMutation,
  useUpdateUserAddressMutation,
  useDeleteUserAddressMutation,
} = authApi;
