"use client";

import { FormProvider, useForm } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../auth/form/Form";
import { Input } from "../auth/form/Input";
import { Button } from "../Button";
import Uploader from "../Uploader";
import { useState } from "react";
import { FileUpload } from "@/types/file";

function AddMovieForm() {
  const [file, setFile] = useState<FileUpload | null>(null);
  const form = useForm({
    defaultValues: {
      title: "",
      publishingYear: "",
    },
  });

  const onSubmit = () => {};

  return (
    <FormProvider {...form}>
      <form className="flex flex-col lg:flex-row gap-6 lg:gap-[120px] ">
        <div className="max-lg:hidden">
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "Title is required",
            }}
            render={() => (
              <FormItem>
                <Uploader file={file} setFile={setFile} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-[380px] max-xs:w-full lg:w-[362px] flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="title"
            rules={{
              required: "Title is required",
            }}
            render={({ field }) => (
              <FormItem>
                <Input type="text" placeholder="Title" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="publishingYear"
            rules={{
              required: "Publishing year is required",
            }}
            render={({ field }) => (
              <FormItem className="w-2/3 max-lg:w-full">
                <Input type="text" placeholder="Publishing year" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="lg:hidden">
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "Title is required",
              }}
              render={() => (
                <FormItem>
                  <Uploader file={file} setFile={setFile} />
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
              onClick={() => form.reset()}
            >
              <span>Cancel</span>
            </Button>
            <Button
              type="button"
              className="!font-bold w-full"
              onClick={() => form.handleSubmit(onSubmit)}
            >
              <span>Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

export default AddMovieForm;
