"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { handleLogin } from "@/lib/actions/login";
import { loginSchema } from "@/lib/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

export default function Home() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      // API call to login
      const result = await handleLogin(data);
      //  const result=  await fetch("/api/login", {
      //     method: "POST",
      //     body: JSON.stringify(data),
      //     cache: "no-store",
      //   });
      //   if(result.ok){
      //     const response = await result.json()
      //     toast.success(response.message)
      //   }
      //   else {
      //     const response = await result.json()
      //     toast.error(response.message)
      //   }
    } catch (err) {
      console.log("🚀 ~ onSubmit ~ err:", err);
      console.log("invalid user email and password");
      toast.error("invalid user email and password");
    }
  };

  return (
    <div className="grid  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="border p-5 min-w-96 bg-slate-50 rounded-md">
        <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-2xl text-center">
          Login
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-5 w-full flex-col py-5"
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Link
              href={"/register"}
              className="text-blue-500 text-sm text-right"
            >
              Don&apos;t have account? Register
            </Link>
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
