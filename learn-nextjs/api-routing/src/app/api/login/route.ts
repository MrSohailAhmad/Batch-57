import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { loginSchema } from "@/lib/validation/schema";
import { db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { eq } from "drizzle-orm";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    //throw new Error("this is Custom error");
    // Validate the parsed body using Zod
    const parsedData = loginSchema.parse(body);

    const response = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, parsedData.email));
    if (response.length > 0) {
      return NextResponse.json({
        message: "User Login successfull",
        data: response?.[0],
      });
    } else {
      throw new Error("User not Found");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors if Zod validation fails
      return NextResponse.json(
        { message: "Something went wrong from zodError", errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 400 }
    );
  }
}
