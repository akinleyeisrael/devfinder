import { db } from "@/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google"
import type { Adapter } from "next-auth/adapters";


export const AuthOptions = {
    adapter: DrizzleAdapter(db) as Adapter,
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        }),
        // ...add m ore providers here
    ],
}
