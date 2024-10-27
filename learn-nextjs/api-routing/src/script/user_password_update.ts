// 1 db (connect)

// 2 bd (user)

//  get all user

// update

import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const userPasswordUpdate = async () => {
  //   console.log("db data", db);
  const users = await db.select().from(usersTable);
  users.map(async (user) => {
    if (user.password && !user.password.startsWith("$2b$")) {
      const hashPassword = await bcrypt.hash(user.password, 10);
      await db
        .update(usersTable)
        .set({
          password: hashPassword,
        })
        .where(eq(usersTable.id, user.id));
    }
  });

  console.log("users", users);
};

userPasswordUpdate();
