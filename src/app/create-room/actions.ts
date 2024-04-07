"use server"

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

export async function  CreateRoomAction(roomData: Omit<Room, "id"|"userId">){
    const session = await getServerSession(authOptions)

    if(!session){
        throw new Error("you must be signed in")
    }
    await db.insert(room).values({...roomData, userId: session.user.id})
}