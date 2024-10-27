import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import toast from "react-hot-toast";
const baseURl = process.env.AUTH_URL;
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        const result = await fetch(`${baseURl}/api/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          cache: "no-store",
        });
        if (result.ok) {
          const response = await result.json();
          toast.success(response.message);
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
});
