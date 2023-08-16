import axios from "axios";
import { API_URL } from "../utilities/constants";

export const apiGet = (path: string, token?: string) => {
  return axios.get(`${API_URL}/${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const apiPost = (path: string, token?: string, body?: object) => {
  const jsonBody = JSON.stringify(body);
  const authHeader = token ? { Authorization: `Bearer ${token}` } : null;

  return axios.post(`${API_URL}/${path}`, jsonBody, {
    headers: {
      ...authHeader,
      "Content-Type": "application/json",
    },
  });
};
