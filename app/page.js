"use client"
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  console.log("session **", session)

  return (
    <div className='bg-blue-900 w-screen h-screen flex items-center'>
      <div className='text-center w-full'>
        <h1> {session?.user.name}</h1>
        <button
          className='bg-white p-2 px-4 rounded-lg' onClick={signIn}>
          Login with google
        </button>
        {session &&
        <div>
        <Image src={session.user.image} alt='owner' width={40} height={40}/>
        <button 
        className='bg-white p-2 px-4 rounded-lg 'onClick={signOut}>
        Login with google
        </button>
        
        </div>
        }
      </div>
    </div>
  )
}
