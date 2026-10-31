"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const loginFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, {
      message: "Please enter a valid password minimum 6 characters",
    }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    confirmPassword: z.string().min(6, {
      message: "Please enter a valid password minimum 6 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type loginFormSchemaType = z.infer<typeof loginFormSchema>;

const UserSignupForm = ({ className, ...props }: UserAuthFormProps) => {
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
    },
  });

  const callbackurl = useSearchParams().get("callbackurl");


  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();



  async function onSubmit(values: loginFormSchemaType) {
    const result = await signIn("credentials", {
      newAccount: true,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
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
    setIsLoading(true);

    // console.log(priceId ? "/verify-subscription" : callbackurl ?? "/dashboard")
    const result = await signIn("google", {
      redirect: false,
      callbackUrl: callbackurl ?? "/logged-in",
    });
    // console.log("success google")
    setIsLoading(false);
  }

  // console.log(form);

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6 flex justify-center items-baseline space-x-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="sr-only">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
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

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="sr-only">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
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
          </div>

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="sr-only">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
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

          <Button disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign up with Email
          </Button>

          {/* </div> */}
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
            <span className="bg-background px-2">Already have an account?</span>
          </div>
        </div>

        <Link
          href={`/sign-in${callbackurl ? `?callbackurl=${callbackurl}` : ""}`}
          className={cn(
            "w-full",
            buttonVariants({
              variant: "secondary",
            })
          )}
        >
          Login
          <ArrowRight className="w-5 h-5 ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default UserSignupForm;
