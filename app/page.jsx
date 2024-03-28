"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <div className="text-blue-900 flex justify-between">
        <h2>
          hello, <b>{session?.user.name} </b>
        </h2>

        <div className="flex items-center bg-gray-300 gap-1 text-black rounded-lg">
          <span className="px-2">
            {session?.user.email}
          </span>
        </div>
      </div>

      <section className="mt-5">
        <h3 className="text-xl font-semibold">Orders</h3>

        <div className="flex justify-evenly flex-wrap py-5">

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">TODAY</p>
            <p className="text-4xl font-bold text-blue-500">16</p>
            <p className="text-gray-500">16 orders today</p>
          </div>

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">THIS WEEK</p>
            <p className="text-4xl font-bold text-blue-500">20</p>
            <p className="text-gray-500">16 orders this week</p>
          </div>

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">THIS MONTH</p>
            <p className="text-4xl font-bold text-blue-500">36</p>
            <p className="text-gray-500">16 orders this month</p>
          </div>
        </div>

        <div className="flex justify-between py-5 flex-wrap">

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">TODAY</p>
            <p className="text-4xl font-bold text-blue-500">$ 161,555</p>
            <p className="text-gray-500">16 orders today</p>
          </div>

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">THIS WEEK</p>
            <p className="text-4xl font-bold text-blue-500">$ 204,322</p>
            <p className="text-gray-500">16 orders this week</p>
          </div>

          <div className="text-center border border-gray-300 rounded p-5 shadow-md hover:shadow-2xl">
            <p className="font-semibold">THIS MONTH</p>
            <p className="text-4xl font-bold text-blue-500">$ 369,333</p>
            <p className="text-gray-500">16 orders this month</p>
          </div>
        </div>

        <p className="text-gray-500 border-b text-center mt-5">
          Note: Here prices are static as on demo project, we won't get daily orders
        </p>

      </section>
    </>
  )
}
