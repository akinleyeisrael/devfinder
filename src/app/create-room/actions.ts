"use server"

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { authConfig } from "@/lib/authConfig";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export async function CreateRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getServerSession(authConfig)

    if (!session) {
        throw new Error("you must be signed in")
    }
    await db.insert(room).values({ ...roomData, userId: session.user.id })
    revalidatePath("/")
}