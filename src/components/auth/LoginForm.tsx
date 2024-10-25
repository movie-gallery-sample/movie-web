"use client";

import { authApi } from "@/features/auth/authApi";
import { Button } from "@/components/Button";
import { FormField, FormItem, FormMessage } from "@/components/auth/form/Form";
import { Input } from "@/components/auth/form/Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants";
import { LoginPayload, LoginResponseResult } from "@/types/auth";
import { Checkbox } from "@radix-ui/themes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../provider/AuthProvider";
import { useState } from "react";

function LoginForm() {
  const { login: loginWithToken } = useAuth();
  const [shouldRemember, setShouldRemember] = useState<boolean>(false);
  const { mutate: login, isPending } = useMutation<
    LoginResponseResult,
    Error,
    LoginPayload
  >({
    mutationFn: async (credentials) => {
      const response = await authApi.login(credentials);
      return response.data;
    },
    onSuccess: (data) => {
      loginWithToken(data);
      if (shouldRemember) {
        localStorage.setItem("refresh_token", data.refreshToken);
      }
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    },
  });

  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginPayload) => {
    login(data);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 mt-10"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Input type="email" placeholder="Email" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must be at least 8 characters long, at least one uppercase letter, one lowercase letter, one digit, and one special character from @$!%*?&",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="password"
                placeholder="Password"
                className="w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row justify-center items-center">
          <Checkbox
            value={shouldRemember ? "checked" : "unchecked"}
            onClick={() => {
              setShouldRemember((prev) => !prev);
            }}
            id="save-account"
            size="2"
            className="mr-2 bg-inputColor w-[20px] h-[20px] flex justify-center items-center rounded"
          />
          <label htmlFor="save-account" className="text-sm">
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          variant="contained"
          className="w-full"
          isLoading={isPending}
        >
          <span className="text-regular">Login</span>
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
