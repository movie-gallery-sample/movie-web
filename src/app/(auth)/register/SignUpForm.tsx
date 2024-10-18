"use client";
import { Button } from "@/components/Button";
import { FormField, FormItem, FormMessage } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { FormProvider, useForm } from "react-hook-form";

function SignUpForm() {
  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  const onSubmit = () => {};

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
          }}
          render={({ field }) => (
            <FormItem>
              <Input
                type="email"
                placeholder="Email"
                color="red"
                // className={`${
                //   form.formState.errors["email"] && "border-[1px] border-error"
                // }`}
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
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
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

        <Button type="submit" variant="contained" className="w-full">
          <span className="text-base">Register</span>
        </Button>
      </form>
    </FormProvider>
  );
}

export default SignUpForm;
