import GoogleProvider from "next-auth/providers/google"

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../database/mongodb"

const adminEmails = ["md.antor1155@gmail.com"]

const handler = NextAuth({
  // pages: {
  //   signIn: "/auth",
  // },
  providers: [
    CredentialsProvider({
      name: "admin Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text", value:"md.antor1155@gmail.com" },
        password: { label: "Password", type: "password", value: "password123" }
      },
      authorize: async (credentials, req) => {
        // Your email and password authentication logic here
        // This is a basic example. Replace it with your actual logic and encripted passwart matching library like argon2.
        if (credentials.email === 'md.antor1155@gmail.com' && credentials.password === 'password123') {
          // return Promise.resolve({ email: 'test@example.com' });
          return {id: "123", name: "admin", email: "md.antor1155@gmail.com"};
        } else {
          // return Promise.resolve(null);
          return null;
        }
      }
    })
    //     GoogleProvider({
    //       clientId: process.env.GOOGLE_CLIENT_ID,
    //       clientSecret: process.env.GOOGLE_CLIENT_SECRET
    //     })
  ],

  // adapter: MongoDBAdapter(clientPromise),

  // callbacks: {
  //   session: ({session, token, user}) =>{

  //     if (adminEmails.includes(user?.email)){
  //       return session
  //     } else{
  //       return false
  //     }
  //   },
  // },

})


export { handler as GET, handler as POST }