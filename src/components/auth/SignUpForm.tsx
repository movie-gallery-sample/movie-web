"use client";
import { authService } from "@/app/(auth)/queries/authService";
import { Button } from "@/components/Button";
import { FormField, FormItem, FormMessage } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/constants";
import { SignUpPayload, SignUpResponseResult } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

function SignUpForm() {
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
      const response = await authService.signUp(credentials);
      return response.data;
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      alert((error as AxiosError)?.response?.data);
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
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Invalid email",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <Input type="email" placeholder="Email" color="red" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
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

        <FormField
          control={form.control}
          name="confirmPassword"
          rules={{
            required: "Confirmation password is required",
            validate: (value: string) =>
              value === password || "Confirmation password is incorrect",
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="password"
                placeholder="Confirmation"
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
          <span className="text-base">Register</span>
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
