import { db } from "@/src/index";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { user } = await req.json();

    try {
        // Check if user already exists
        const userInfo = await db.select().from(usersTable)
            .where(eq(usersTable.email, user?.primaryEmailAddress.emailAddress));

        console.log("User", userInfo);

        // If user doesn't exist, add new user
        if (userInfo?.length === 0) {
            const SaveResult = await db.insert(usersTable)
                .values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress.emailAddress
                })
                .returning();

            return NextResponse.json({ result: SaveResult });
        }

        return NextResponse.json({ result: userInfo });
    } catch (e: unknown) {
        // Check if e is an instance of Error to safely access the message property
        if (e instanceof Error) {
            return NextResponse.json({ error: e.message });
        }
        // Fallback in case e is not an Error instance
        return NextResponse.json({ error: "An unknown error occurred" });
    }
}