"use client"
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()

  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          hello, <b>{session?.user.name} </b>
        </h2>

        <div className="flex items-center bg-gray-300 gap-1 text-black rounded-lg">
          <Image
            src={session?.user.image}
            width={30}
            height={30}
            alt="User"
            className="rounded-full"
          />
          <span className="px-2">
            {session?.user.name}
          </span>
        </div>
      </div>
    </Layout>
  )
}
