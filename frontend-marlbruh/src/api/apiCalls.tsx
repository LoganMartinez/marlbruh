import { AxiosResponse } from "axios";
import { apiDelete, apiGet, apiPost, apiPut } from "./apiUtils";
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
  newPfp: File | undefined,
  newColor: string | undefined
) {
  return apiPut(
    `users/${username}/`,
    {
      username: newUsername,
      password: newPassword,
      profilePic: newPfp,
      profileColor: newColor,
    },
    token,
    "form"
  );
}

export function getChores(token: string) {
  return apiGet("chores/", token);
}

export function getAllUsers(token: string) {
  return apiGet("users/", token);
}

export function createChore(
  name: string,
  icon: string,
  userId: number | undefined,
  token: string
) {
  return apiPost("chores/", { name: name, icon: icon, userId: userId }, token);
}

export function deleteChore(choreId: number, token: string) {
  return apiDelete(`chores/${choreId}`, token);
}

export function updateChore(
  choreId: number,
  token: string,
  name: string | undefined,
  icon: string | undefined,
  userId: number | undefined
) {
  return apiPut(
    `chores/${choreId}/`,
    {
      name: name,
      icon: icon,
      userId: userId,
    },
    token
  );
}
