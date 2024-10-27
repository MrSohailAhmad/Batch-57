import { auth } from "@/auth";
import React from "react";

async function Dashboard() {
  const user = await auth();

  return (
    <div>
      Dashboard
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
