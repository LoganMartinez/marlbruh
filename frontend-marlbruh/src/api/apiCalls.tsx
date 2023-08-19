import { AxiosResponse } from "axios";
import { apiGet, apiPost, apiPut } from "./apiUtils";
import { FileWithPath } from "@mantine/dropzone";

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
  return apiPost("users/token/", {
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
  password: string,
  profilePic: FileWithPath | null
): Promise<AxiosResponse<CreateUserResponse>> {
  return apiPost(
    "users/",
    {
      username,
      password,
      ...(profilePic ? { profilePic } : {}),
    },
    undefined,
    "form"
  );
}

export function getUser(username: string, token: string) {
  return apiGet(`users/${username}/`, token);
}

export function updateUser(
  username: string,
  token: string,
  newUsername: string | undefined,
  newPassword: string | undefined,
  newPfp: File | undefined
) {
  return apiPut(
    `users/${username}/`,
    { username: newUsername, password: newPassword, profilePic: newPfp },
    token,
    "form"
  );
}
