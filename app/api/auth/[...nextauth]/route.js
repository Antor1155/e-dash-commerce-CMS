import GoogleProvider from "next-auth/providers/google"

import NextAuth, { getServerSession } from "next-auth"

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../database/mongodb"

const adminEmails = ["md.antor1155@gmail.com"]

const authOptions = {
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    session: ({session, token, user}) =>{

      if (adminEmails.includes(user?.email)){
        return session
      } else{
        return false
      }
    },
  },

}

const handler = NextAuth(authOptions)

// this function is used to identify, one of admin made a request 
// use this function in every requests to server : get , post, put
async function isAdminRequest() {
  const session = await getServerSession(authOptions)

  if (!adminEmails.includes(session?.user?.email)){
    throw "not an admin"
  }
}

export { handler as GET, handler as POST, isAdminRequest }