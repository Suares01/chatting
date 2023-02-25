import { apiSlice } from "../../query";
import { UserProps } from "../authentication-slice";

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface RegisterBody {
  email: string;
  password: string;
  username: string;
}

interface GetUserBaseResponse {
  user: UserProps;
}

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<undefined, RegisterBody>({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
    }),
    getUser: builder.query<UserProps, undefined>({
      query: () => "users/me",
      transformResponse(value: GetUserBaseResponse) {
        return value.user;
      },
    }),
  }),
});

export const { useLoginMutation, useGetUserQuery, useRegisterMutation } =
  authApiSlice;
