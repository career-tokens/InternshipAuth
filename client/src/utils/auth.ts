import cookie from "js-cookie";
import axios from "axios";
import { baseURL } from "./constant";

export const setCookie = (key: string, value: string): void => {
  cookie.set(key, value, { expires: 1 });
};

export const removeCookie = (key: string): void => {
  cookie.remove(key);
};

export const getCookie = (key: string): string | undefined => {
  return cookie.get(key);
};

export const setAuthentication = (token: string): void => {
  setCookie("token", token);
};

export const logOut = (): void => {
  removeCookie("token");
};

interface AuthResponse {
  data: boolean; // Adjust this based on the actual response structure from your backend
}

export const isLogin = async (): Promise<boolean> => {
  const token = getCookie("token");

  if (token) {
    const res = await axios.post<AuthResponse>(`${baseURL}/auth`, { token });
    return res.data;
  }
  return false;
};
