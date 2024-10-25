import { privateClient } from "@/lib/apiClient/privateClient";
import { MoviePayload } from "@/types/movie";

export const movieApi = {
  getMovies: async () => {
    const response = await privateClient.get("/movies?page=1&limit=8");
    return response;
  },
  addMovie: async (data: MoviePayload) => {
    const response = await privateClient.post("/movies", {
      data,
    });
    return response;
  },
  editMovie: async (data: MoviePayload, id: string) => {
    const response = await privateClient.patch(`/movies/${id}`, {
      data,
    });
    return response;
  },
  removeMovie: async (id: string) => {
    const response = await privateClient.delete(`/movies/${id}`);
    return response;
  },
};
