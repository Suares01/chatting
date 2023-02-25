import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  createApi,
} from "@reduxjs/toolkit/query/react";
import { logout } from "../authentication/authentication-slice";
import { Cookies } from "react-cookie";

interface RefreshResult {
  accessToken: string;
}

type Result<T = unknown> = QueryReturnValue<
  T,
  FetchBaseQueryError,
  FetchBaseQueryMeta
>;

const cookies = new Cookies();

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  prepareHeaders(headers) {
    const accessToken: string | undefined = cookies.get("chatting:accesstoken");
    accessToken && headers.set("Authorization", `Bearer ${accessToken}`);
    return headers;
  },
});

const refreshBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_BASE_URL,
  prepareHeaders(headers) {
    const refreshToken: string | undefined = cookies.get(
      "chatting:refreshtoken"
    );
    refreshToken && headers.set("Authorization", `Bearer ${refreshToken}`);
    return headers;
  },
});

export async function authBaseQuery(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions = {}
) {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = (await refreshBaseQuery(
      "/refreshtoken",
      api,
      extraOptions
    )) as Result<RefreshResult>;

    if (refreshResult.data) {
      const accessToken = refreshResult.data.accessToken;
      cookies.set("chatting:accesstoken", accessToken, {
        maxAge: 86400, // 1 day
        secure: true,
      });
      result = await baseQuery(args, api, extraOptions);
    } else if (refreshResult.error) {
      api.dispatch(logout());
    }
  }

  return result;
}

export const apiSlice = createApi({
  baseQuery: authBaseQuery,
  endpoints: () => ({}),
});
