import GoogleProvider from "next-auth/providers/google"

import NextAuth from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../database/mongodb"

const adminEmails = new Set(["md.antor1155@gmail.com"])

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    adapter: MongoDBAdapter(clientPromise),

    callbacks: {
      session: ({session, token, user}) =>{

        if (adminEmails.has(user?.email)){
          return session
        } else{
          return false
        }
      },
    },
})

export { handler as GET, handler as POST }