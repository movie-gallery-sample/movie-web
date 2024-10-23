"use client";

import { Button } from "@/components/Button";
import MovieCard from "@/components/movie/MovieCard";
import Pagination from "@/components/Pagination";
import { movieApi } from "@/features/movie/movieApi";
import Spinner from "@/components/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CirclePlus, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { Movie, MoviesResult } from "@/types/movie";
import { authApi } from "@/features/auth/authApi";
import { queryClient } from "@/components/provider";
import { AuthContext } from "@/components/provider/AuthProvider";

function MoviesList() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(8);

  const { data, isError, error, isLoading } = useQuery<MoviesResult>({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await movieApi.getMovies();
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const response = await authApi.logout();
      return response;
    },
    onSuccess: () => {
      queryClient.removeQueries();
      setUser({});
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const { data: movies } = data || {};

  useEffect(() => {
    if (isError && error instanceof AxiosError) {
      toast.error(error?.response?.data.message);
    }
  }, [isError, error]);

  return (
    <div className="w-full min-h-[calc(100vh-90px)] flex flex-col justify-center items-center ">
      {isLoading && !isError && <Spinner />}
      {!isLoading && !isError && (
        <>
          {!movies?.length ? (
            <div className="text-center translate-y-1/4 ">
              <h3 className="md:text-4xl font-semibold mb-10">
                Your movie list is empty
              </h3>
              <Button
                className="w-auto m-auto"
                onClick={() => router.push("/movies/add")}
              >
                Add a new movie
              </Button>
            </div>
          ) : (
            <div className="px-6 md:w-[88%] py-20 flex flex-col flex-grow justify-start gap-20 md:gap-30">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                  <h3 className="max-xs:text-3xl md:text-4xl font-semibold">
                    Your movies
                  </h3>
                  <button
                    onClick={() => {
                      router.push("/movies/add");
                    }}
                    className="translate-y-[20%]"
                  >
                    <CirclePlus className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
                  </button>
                </div>

                {/* <div className="flex flex-row items-center gap-3  text-center translate-y-[12.5%]"> */}
                <button
                  onClick={() => logout()}
                  className="flex flex-row items-center gap-3  text-center translate-y-[12.5%]"
                >
                  <p className="text-regular font-bold max-sm:hidden">Logout</p>
                  <LogOut className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
                </button>
                {/* </div> */}
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {movies?.length &&
                  movies.map((movie, index) => (
                    <MovieCard key={index} {...movie} />
                  ))}
              </div>

              <Pagination
                className="w-fit m-auto"
                data={movies}
                options={{
                  pageSize: limit,
                  totalCount: 20,
                  currentPage: page,
                  siblingCount: 2,
                  setPage,
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MoviesList;
