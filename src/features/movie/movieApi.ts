import { privateClient } from "@/lib/apiClient/privateClient";
import { MoviePayload, Params } from "@/types/movie";

export const movieApi = {
  getMovies: async (params: Params) => {
    const response = await privateClient.get("/movies", { params });
    return response;
  },
  getMovie: async (id: string | string[]) => {
    const response = await privateClient.get(`/movies/${id}`);
    return response;
  },
  addMovie: async (data: MoviePayload) => {
    const response = await privateClient.post("/movies", data);
    return response;
  },
  editMovie: async (data: MoviePayload, id: string | string[]) => {
    const response = await privateClient.patch(`/movies/${id}`, data);
    return response;
  },
  removeMovie: async (id: string) => {
    const response = await privateClient.delete(`/movies/${id}`);
    return response;
  },
};
