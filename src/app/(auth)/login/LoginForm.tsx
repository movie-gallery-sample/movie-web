"use client";
import { Button } from "@/components/Button";
import { FormField, FormItem, FormMessage } from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { Checkbox } from "@radix-ui/themes";
import { FormProvider, useForm } from "react-hook-form";

function LoginForm() {
  const form = useForm({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

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
            defaultChecked
            id="save-account"
            size="2"
            className="mr-2 bg-inputColor w-[20px] h-[20px] flex justify-center items-center rounded"
          />
          <label htmlFor="save-account" className="text-sm">
            Remember me
          </label>
        </div>

        <Button type="submit" variant="contained" className="w-full">
          <span className="text-base">Login</span>
        </Button>
      </form>
    </FormProvider>
  );
}

export default LoginForm;
