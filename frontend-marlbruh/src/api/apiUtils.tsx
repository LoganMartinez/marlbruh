import axios from "axios";
import { API_URL } from "../utilities/constants";

export const apiGet = (path: string, token?: string) => {
  return axios.get(`${API_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiPost = (
  path: string,
  body: Record<string, any>,
  token?: string,
  contentType = "json" as "json" | "form"
) => {
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;
  const url = `${API_URL}/${path}`;
  if (contentType === "json") {
    // JSON request
    const jsonBody = JSON.stringify(body);
    return axios.post(url, jsonBody, {
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
    });
  } else {
    // form-data request
    const formBody = new FormData();
    for (const key in body) {
      formBody.append(key, body[key]);
    }
    return axios.post(url, formBody, {
      headers: {
        ...authHeader,
        "Content-Type": "multipart/form-data",
      },
    });
  }
};
