import { AxiosResponse } from "axios";
import { apiGet, apiPost } from "./apiUtils";

export function getUserGivenToken(token: string): Promise<AxiosResponse<User>> {
  return apiGet("users/me/", token);
}

type GetTokenResponse = {
  token: string;
};
export function getToken(
  username: string,
  password: string
): Promise<AxiosResponse<GetTokenResponse>> {
  return apiPost("users/token/", undefined, {
    username: username,
    password: password,
  });
}

type CreateUserResponse = {
  username: string;
  token: string;
};
export function createUser(
  username: string,
  password: string
): Promise<AxiosResponse<CreateUserResponse>> {
  return apiPost("users/", undefined, {
    username,
    password,
  });
}
