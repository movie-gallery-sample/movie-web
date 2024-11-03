import { privateClient } from "@/lib/apiClient/privateClient";
import { RemovedFilePayload } from "@/types/file";

export const uploadApi = {
  singleUpload: async (data: FormData) => {
    const response = await privateClient.post("/uploading", data);
    return response;
  },
  removedFile: async (file: RemovedFilePayload) => {
    const response = await privateClient.post("/uploading/removed-single-file", file);
    return response;
  }
};
