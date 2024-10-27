import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import React from "react";

async function Dashboard() {
  const user = await auth();

  return (
    <div>
      Dashboard
      <div>
        <form
          action={async () => {
            "use server";
            await signOut(redirect("/"));
          }}
        >
          <Button>Logout</Button>
        </form>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
