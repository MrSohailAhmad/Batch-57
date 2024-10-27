"use server";

import { signIn } from "@/auth";
import toast from "react-hot-toast";

type LoginData = {
  email: string;
  password: string;
};

const baseUrl = process.env.AUTH_URL;
export const handleLogin = async (data: LoginData) => {
  const user = await fetch(`${baseUrl}/api/login`, {
    method: "POST",
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (user.ok) {
    const response = await user.json();
    toast.success(response.message);
  }
  if (!user) {
    throw new Error("User Not found");
  }

  await signIn("credentials", data);

  console.log("login data", data);
};
