import { privateClient } from "@/lib/apiClient/privateClient";

export const uploadApi = {
  singleUpload: async (data: FormData) => {
    const response = await privateClient.post("/uploading", data);
    return response;
  },
};
