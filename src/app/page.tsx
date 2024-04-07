import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const rooms = await db.query.room.findMany()
  return (
    <div>
      {rooms.map(room => (
        <div key={room.name}>{room.name}</div>
      ))}

    </div>
  );
}
