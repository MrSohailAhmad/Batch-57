"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { loginSchema } from "../validation/schema";
export const handleLogin = async (data: z.infer<typeof loginSchema>) => {
  "use server";
  console.log("api call");
  const response = await signIn("credentials", data, {
    redirectTo: "/dashboard",
  });

  if (response) {
    // const response = await response.json();
    console.log("if response");
    redirect("/dashboard");
  }
  if (!response) {
    throw new Error("User Not found");
  }

  // await signIn("credentials", data);

  console.log("login data", data);
};
