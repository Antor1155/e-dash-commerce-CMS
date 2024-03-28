"use client"
import { useState } from "react";


const Page = () => {
    const [admins, setAdmins] = useState(["md.antor1155@gmail.com"])

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        setAdmins(prev => [...prev, email])

        e.target.email.value = ""
        e.target.password.value = ""
    }

    const handleDelete = (value) => {
        setAdmins(prev => prev.filter(v => v !== value))
    }

    console.log(admins)

    return (
        <div>
            <h2 className='text-xl mb-5'>Settings Page</h2>

            <h3 className="text-lg font-bold mb-5 text-blue-700">Add admin</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex gap-5">
                    <input name="email" type="text" placeholder="test@gmail.com" required/>
                    <input name="password" type="password" placeholder="password" required/>
                </div>

                <button type="submit" className="bg-blue-400 border-2 px-8 py-2 rounded-md mt-5">Add</button>
            </form>

            <h3 className="mt-10 mb-5 text-md font-bold text-blue-500">Present Admins</h3>
            {admins.map(admin => (
                <div key={admin} className="flex items-center gap-5">

                    <p> <span className="font-bold">Email: </span> {admin}</p>
                    <button className="text-sm bg-red-400 border-2 px-8 py-2 rounded-md"
                        onClick={() => handleDelete(admin)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Page;