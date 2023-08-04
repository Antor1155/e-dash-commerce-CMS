"use client"
import { SessionProvider } from "next-auth/react"

const Porvider = ({children, session}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default Porvider