"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authErrors } from "@/components/auth/authErrors";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Please enter a valid password" }),
});

type loginFormSchemaType = z.infer<typeof loginFormSchema>;

const UserLoginForm = ({ className, ...props }: UserAuthFormProps) => {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const callbackurl = useSearchParams().get("callbackurl");
  // console.log(callbackurl)

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  async function onSubmit(values: loginFormSchemaType) {
    const result = await signIn("credentials", {
      newAccount: false,
      email: values.email.trim(),
      password: values.password.trim(),
      redirect: false,
      // callbackUrl: "/dashboard",
    });

    if (!result?.error && result?.ok) {
      router.replace(callbackurl ?? "/logged-in");
    }

    if (result?.error) {
      // console.log(result.error)
      const e = authErrors.find((e) => e.serverError === result?.code);
      // console.log(e)
      setError(e);
    }
  }

  async function googleLoginHandler() {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        // redirect: false,

        callbackUrl: callbackurl ?? "/logged-in",
      });
      // console.log(result);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  // console.log(form);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      {...field}
                      onChange={(e) => {
                        setError(null);
                        field.onChange(e);
                      }}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      {...field}
                      onChange={(e) => {
                        setError(null);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              );
            }}
          />
          <div>
            <Button disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
            <div className="flex justify-end text-sm mt-0.5 text-blue-600 dark:text-blue-100">
              <Link href={"/password-reset"}>Forgot Password?</Link>
            </div>
          </div>
        </form>
      </Form>

      {error && (
        <Alert>
          {error ? (
            <error.icon
              className={"h-5 w-5 decoration-red-500"}
              color="rgb(244 63 94)"
            />
          ) : null}
          <AlertTitle className="text-rose-500">{error?.title}</AlertTitle>
          <AlertDescription className="text-red-400">
            {error?.description}
          </AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={googleLoginHandler}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>

      <div className="space-y-2">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2">
              Don&apos;t have an account?
            </span>
          </div>
        </div>

        <Link
          href="/sign-up"
          className={cn(
            "w-full",
            buttonVariants({
              variant: "secondary",
            })
          )}
        >
          Create New Account
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default UserLoginForm;
