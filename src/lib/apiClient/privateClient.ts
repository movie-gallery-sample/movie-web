import axios, { AxiosResponse } from "axios";

export const privateClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: Number(process.env.API_TIMEOUT) || 15000,
});

// client.interceptors.request.use(
//   async (config) => {
//     try {
//       if (!config.headers["Authorization"]) {
//         config.headers["Authorization"] = `Bearer ${localStorage.getItem(
//           "accessToken"
//         )}`;
//       }
//     } catch (err) {
//       return Promise.reject(err);
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

privateClient.interceptors.response.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response: AxiosResponse<any>) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export function setToken(token: string) {
  privateClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
