import { authClient } from "@/lib/apiClient/authApi";
import { LoginPayload, SignUpPayload } from "@/types/auth";

export const authService = {
  login: async (data: LoginPayload) => {
    const response = await authClient.post("/credentials/login", data);
    return response;
  },
  signUp: async (data: SignUpPayload) => {
    const response = await authClient.post("/credentials/register", data);
    return response;
  },
};
