import { privateClient } from "@/lib/apiClient/privateClient";
import { publicClient } from "@/lib/apiClient/publicClient";
import { LoginPayload, SignUpPayload } from "@/types/auth";

export const authApi = {
  login: async (data: LoginPayload) => {
    const response = await publicClient.post("/credentials/login", data);
    return response;
  },
  signUp: async (data: SignUpPayload) => {
    const response = await publicClient.post("/credentials/register", data);
    return response;
  },
  logout: async () => {
    const response = await privateClient.post("/credentials/logout");
    return response;
  },
};
