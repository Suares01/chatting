import { useMutation, useQuery } from "react-query";
import { authAxios, publicAxios } from "../../../libs/axios";
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

export function useLogin() {
  return useMutation(async (body: LoginBody) => {
    const { email, password } = body;

    const { data } = await publicAxios.post<LoginResponse>("/login", {
      email,
      password,
    });

    return data;
  });
}

export function useRegister() {
  return useMutation(async (body: RegisterBody) => {
    const { email, password, username } = body;

    await publicAxios.post("/users", { email, password, username });
  });
}

export function useGetUser() {
  return useQuery<UserProps>(["user:data"], async () => {
    const { data } = await authAxios.get<GetUserBaseResponse>("/users/me");

    return data.user;
  });
}
