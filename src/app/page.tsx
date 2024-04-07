import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const items = await db.query.accounts.findMany()
  return (
    <div>
      {items.map(ac => (
        <div key={ac.access_token}>{ac.id_token}</div>
      ))}

    </div>
  );
}
