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
  profilePic: FileWithPath | undefined,
  profileColor: string
): Promise<AxiosResponse<CreateUserResponse>> {
  return apiPost(
    "users/",
    {
      username,
      password,
      ...(profilePic ? { profilePic } : {}),
      profileColor,
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
  userIds: number[],
  description: string | undefined,
  token: string
) {
  return apiPost(
    "chores/",
    { name: name, icon: icon, userIds: userIds, description: description },
    token
  );
}

export function deleteChore(choreId: number, token: string) {
  return apiDelete(`chores/${choreId}`, token);
}

export function updateChore(
  choreId: number,
  token: string,
  name: string | undefined,
  icon: string | undefined,
  userIds: number[] | undefined,
  complete: boolean | undefined,
  description: string | undefined | null
) {
  return apiPut(
    `chores/${choreId}/`,
    {
      name: name,
      icon: icon,
      userIds: userIds,
      complete: complete,
      description: description,
    },
    token
  );
}

export function getPiclePosts(token: string) {
  return apiGet(`picle/`, token);
}

export function createPiclePost(
  content: FileWithPath,
  caption: string,
  token: string
) {
  return apiPost(`picle/`, { content, caption }, token, "form");
}

export function likePiclePost(postId: number, token: string) {
  return apiPut(`picle/${postId}/like/`, { junk: "JUNK" }, token);
}

export function createComment(postId: number, content: string, token: string) {
  return apiPost(`picle/${postId}/comments/`, { content }, token);
}

export function getComments(postId: number, token: string) {
  return apiGet(`picle/${postId}/comments/`, token);
}

export function getBooks(token: string) {
  return apiGet(`bookclub/`, token);
}

export function getBook(bookId: number, token: string) {
  return apiGet(`bookclub/${bookId}/`, token);
}

export function getChapter(
  bookId: number,
  chapterNumber: number,
  token: string
) {
  return apiGet(`bookclub/${bookId}/chapters/${chapterNumber}`, token);
}

export function getBookclubComments(
  bookId: number,
  chapterNumber: number,
  token: string
) {
  return apiGet(
    `bookclub/${bookId}/chapters/${chapterNumber}/comments/`,
    token
  );
}

export function createBookclubComment(
  bookId: number,
  chapterNumber: number,
  passage: string,
  comment: string,
  highlighted: string[],
  token: string
) {
  return apiPost(
    `bookclub/${bookId}/chapters/${chapterNumber}/comments/`,
    { passage, comment, highlighted },
    token
  );
}
