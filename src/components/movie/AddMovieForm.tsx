"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../form/Form";
import { Input } from "../form/Input";
import { Button } from "../Button";
import Uploader from "../Uploader";
import { useEffect, useState } from "react";
import { FileUpload } from "@/types/file";
import { useMutation } from "@tanstack/react-query";
import { movieApi } from "@/features/movie/movieApi";
import { queryClient } from "../provider";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Movie, MoviePayload } from "@/types/movie";
import { YEAR_REGEX } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner";
import { useParams } from "next/navigation";
import MyModal from "../utils/modals/MyModal";
import { cn } from "@/lib/utils";

type Props = {
  isEdit?: boolean;
};

function AddMovieForm(props: Props) {
  const { isEdit } = props;
  const { id } = useParams();
  const router = useRouter();
  const [file, setFile] = useState<FileUpload | null>(null);
  const [open, setOpen] = useState(false);
  const form = useForm({
    mode: "onSubmit",
    defaultValues: async () => {
      try {
        if (id && isEdit) {
          const response = await movieApi.getMovie(id);
          const movie = response.data || {};
          setFile({
            path: movie?.posterUrl,
          });
          return {
            title: movie?.title,
            publishingYear: movie?.publishingYear,
            posterUrl: movie?.posterUrl,
          };
        }

        throw new Error();
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      }
      return { title: "", publishingYear: undefined, posterUrl: "" };
    },
  });

  const { mutate: addMovie, isPending } = useMutation<
    Movie,
    Error,
    MoviePayload
  >({
    mutationFn: async (data) => {
      const response = await movieApi.addMovie(data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      toast.success("Movie added successfully");
      form.setValue("title", undefined);
      form.setValue("publishingYear", undefined);
      form.setValue("posterUrl", undefined);
      setFile(null);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const { mutate: editMovie, isPending: isEditing } = useMutation<
    Movie,
    Error,
    MoviePayload
  >({
    mutationFn: async (data) => {
      const response = await movieApi.editMovie(data, id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies", id] });
      toast.success("Movie edited successfully");
      setOpen(false);
      router.push("/movies");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  useEffect(() => {
    if (!file) {
      form.setValue("posterUrl", "");
      return;
    }
    if (form.formState.errors["posterUrl"]) {
      form.clearErrors("posterUrl");
    }
    form.setValue("posterUrl", file.path);
  }, [file, form]);

  const handleUpdateMovie = async () => {
    const data = form.getValues() as MoviePayload;

    editMovie({
      ...data,
      publishingYear: Number(data.publishingYear),
    });
  };

  const onSubmit = (data: MoviePayload) => {
    if (!form.getValues("posterUrl")) {
      return form.setError("posterUrl", {
        type: "custom",
        message: "Poster is required",
      });
    }

    if (isEdit) {
      setOpen(true);
    } else {
      addMovie({
        ...data,
        publishingYear: Number(data.publishingYear),
      });
    }
  };

  return (
    <>
      {isEdit && form.formState.isLoading ? (
        <Spinner />
      ) : (
        <>
          <FormProvider {...form}>
            <form className="flex flex-col m-auto w-full md:flex-row gap-6 md:gap-10 lg:gap-[120px] ">
              <div className="max-md:hidden">
                <FormField
                  control={form.control}
                  name="posterUrl"
                  rules={{
                    required: "Poster is required",
                  }}
                  render={() => (
                    <FormItem>
                      <Uploader
                        file={file}
                        setFile={setFile}
                        disabled={isPending || isEditing}
                        className={cn(
                          "w-full",
                          form.formState?.errors["posterUrl"] && "border-error"
                        )}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" max-xs:w-full lg:w-[362px] flex flex-col gap-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{
                    required: "Title is required",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <Input
                        type="text"
                        placeholder="Title"
                        disabled={isPending || isEditing}
                        className={cn(
                          "w-full",
                          form.formState?.errors["title"] && "ring-error"
                        )}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="publishingYear"
                  rules={{
                    required: "Publishing year is required",
                    pattern: {
                      value: YEAR_REGEX,
                      message: "Invalid year",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="md:w-2/3 :w-full">
                      <Input
                        type="text"
                        placeholder="Publishing year"
                        disabled={isPending || isEditing}
                        className={cn(
                          "w-full",
                          form.formState?.errors["publishingYear"] &&
                            "ring-error"
                        )}
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:hidden">
                  <FormField
                    control={form.control}
                    name="posterUrl"
                    rules={{
                      required: "Poster is required",
                    }}
                    render={() => (
                      <FormItem>
                        <Uploader
                          file={file}
                          setFile={setFile}
                          disabled={isPending || isEditing}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-between items-center gap-4 mt-[64px]">
                  <Button
                    type="button"
                    variant="outlined"
                    color="white"
                    className="!font-bold w-full"
                    disabled={isPending || isEditing}
                    onClick={() => {
                      router.push("/movies");
                    }}
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    type="button"
                    className="!font-bold w-full"
                    disabled={isPending || isEditing}
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    <span>{isEdit ? "Update" : "Submit"}</span>
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
          {isEdit && (
            <MyModal
              title="Update movie?"
              description="Are you sure you want to update this movie?"
              open={open}
              onOpenChange={setOpen}
              isLoading={isEditing}
              confirm={handleUpdateMovie}
            />
          )}
        </>
      )}
    </>
  );
}

export default AddMovieForm;
