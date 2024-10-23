import axios, { AxiosResponse } from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

export const privateClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: Number(process.env.API_TIMEOUT) || 15000,
});

privateClient.interceptors.request.use(
  async (config) => {
    try {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem(
          "access_token"
        )}`;
      }
    } catch (err) {
      return Promise.reject(err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    const accessToken = localStorage.getItem("access_token") || "";

    const payload = jwtDecode<JwtPayload>(accessToken);
    const now = Math.floor(new Date().getTime() / 1000);

    try {
      if (
        error?.response?.status === 401 &&
        !prevRequest?.sent &&
        payload.exp &&
        payload.exp < now
      ) {
        const refreshToken = localStorage.getItem("refresh_token") || "";

        if (!refreshToken) {
          throw new Error();
        }

        const refreshPayload = jwtDecode<JwtPayload>(refreshToken);

        if (refreshPayload.exp && refreshPayload.exp < now) {
          throw new Error();
        } else {
          prevRequest.sent = true;
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/credentials/refresh`,
            { refreshToken },
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          const newAccessToken = response.data?.accessToken;
          localStorage.setItem("access_token", newAccessToken);

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        }
        return privateClient(prevRequest);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      window.location.assign("/login");
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export function setToken(token: string) {
  privateClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
