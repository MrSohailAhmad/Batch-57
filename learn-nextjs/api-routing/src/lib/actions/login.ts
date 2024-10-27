"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "../validation/schema";
export const handleLogin = async (data: z.infer<typeof loginSchema>) => {
  "use server";
  const response = await signIn("credentials", {
    ...data,
    redirect: false,
    callbackUrl: "/dashboard",
  });

  console.log("res", response);

  if (response) {
    redirect("/dashboard");
  }

  if (!response) {
    throw new Error("User Not found");
  }
};
