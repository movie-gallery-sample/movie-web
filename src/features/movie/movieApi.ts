import { privateClient } from "@/lib/apiClient/privateClient";

export const movieApi = {
  getMovies: async () => {
    const response = await privateClient.get("/movies?page=1&limit=8");
    return response;
  },
};
