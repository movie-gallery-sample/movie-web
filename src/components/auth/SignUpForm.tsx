"use client";
import { authApi } from "@/features/auth/authApi";
import { Button } from "@/components/Button";
import { FormField, FormItem, FormMessage } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/constants";
import { SignUpPayload, SignUpResponseResult } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

function SignUpForm() {
  const { t } = useTranslation("auth");
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { mutate: signUp, isPending } = useMutation<
    SignUpResponseResult,
    Error,
    SignUpPayload
  >({
    mutationFn: async (credentials) => {
      const response = await authApi.signUp(credentials);
      return response.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      if (error instanceof AxiosError)
        toast.error(error.response?.data.message);
    },
  });

  const password = form.watch("password");

  const onSubmit = (data: SignUpPayload) => {
    signUp(data);
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
            required: t("Email is required"),
            pattern: {
              value: EMAIL_REGEX,
              message: t("Invalid email"),
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="email"
                placeholder={t("Email")}
                color="red"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: t("Password is required"),
            minLength: {
              value: 8,
              message: t("Password must be at least 8 characters"),
            },
            pattern: {
              value: PASSWORD_REGEX,
              message: t("Password regex"),
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="password"
                placeholder={t("Password")}
                className="w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: t("Confirmation password is required"),
            validate: (value: string) =>
              value === password || t("Confirmation password is incorrect"),
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="password"
                placeholder={t("Confirmation")}
                className="w-full"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          className="w-full"
          isLoading={isPending}
        >
          <span className="text-regular">{t("Register")}</span>
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
