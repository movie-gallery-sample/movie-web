"use client";

import { Button } from "@/components/Button";
import MovieCard from "@/components/movie/MovieCard";
import Pagination from "@/components/Pagination";
import { movieApi } from "@/features/movie/movieApi";
import Spinner from "@/components/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { CirclePlus, LogOut } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { MoviesResult } from "@/types/movie";
import { authApi } from "@/features/auth/authApi";
import { AuthContext } from "@/components/provider/AuthProvider";
import { useTranslations } from "next-intl";

function MoviesList() {
  const t = useTranslations("Homepage");
  const { logout: clientLogout } = useContext(AuthContext);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(12);

  const { data, isError, error, isLoading } = useQuery<MoviesResult>({
    queryKey: ["movies", page, limit],
    queryFn: async () => {
      const response = await movieApi.getMovies({ page, limit });
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
      clientLogout();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const { data: movies, total } = data || {};

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
            <div className="text-center px-6">
              <h3 className="md:text-4xl font-semibold mb-10">
                {t("Your movie list is empty")}
              </h3>
              <Button
                className="w-auto m-auto max-md:w-full"
                onClick={() => router.push("/movies/add")}
              >
                {t("Add a new movie")}
              </Button>
            </div>
          ) : (
            <div className="w-full px-6 py-20 md:px-20 flex flex-col flex-grow justify-start gap-20 md:gap-30">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row items-center gap-3">
                  <h3 className="max-xs:text-3xl md:text-4xl font-semibold">
                    {t("My movies")}
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

                <button
                  onClick={() => logout()}
                  className="flex flex-row items-center gap-3  text-center translate-y-[12.5%]"
                >
                  <p className="text-regular font-bold max-sm:hidden">
                    {t("Logout")}
                  </p>
                  <LogOut className="w-[24px] h-[24px] md:w-[32px] md:h-[32px]" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:max-lg:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* <div className="flex flex-wrap gap-6 justify-center"> */}
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
                  totalCount: total as number,
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
