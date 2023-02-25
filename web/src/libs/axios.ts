import axios, { AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const cookies = new Cookies();

function refreshAuthLogic(failedRequest: any) {
  const refreshToken: string | undefined = cookies.get("chatting:refreshtoken");

  const options: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
    url: `${baseURL}/refreshtoken`,
  };

  return axios(options)
    .then(async (refreshtokenResponse) => {
      const accessToken = refreshtokenResponse.data.accessToken;

      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;

      cookies.set("chatting:accesstoken", accessToken, {
        maxAge: 86400, // 1 day
        secure: true,
      });

      return Promise.resolve();
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        cookies.remove("chatting:accesstoken", { path: "/" });
        cookies.remove("chatting:refreshtoken", { path: "/" });
      }
    });
}

export const authAxios = axios.create({
  baseURL,
});

authAxios.interceptors.request.use((config) => {
  const accessToken: string | undefined = cookies.get("chatting:accesstoken");
  config.headers.set("Authorization", `Bearer ${accessToken}`);
  return config;
});

createAuthRefreshInterceptor(authAxios, refreshAuthLogic);

export const publicAxios = axios.create({
  baseURL,
});
