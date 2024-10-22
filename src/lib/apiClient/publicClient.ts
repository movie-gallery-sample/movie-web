import axios from "axios";

export const publicClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: Number(process.env.API_TIMEOUT) || 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
