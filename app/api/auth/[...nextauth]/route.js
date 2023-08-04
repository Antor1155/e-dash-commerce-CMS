import GoogleProvider from "next-auth/providers/google"

import NextAuth from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/database/mongodb"

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    adapter: MongoDBAdapter(clientPromise)
})

export { handler as GET, handler as POST }