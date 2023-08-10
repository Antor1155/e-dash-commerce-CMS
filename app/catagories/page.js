"use client"
import axios from "axios"
import {useState} from "react"

const Catagories = () => {
    const [name, setName] = useState("")

    async function handleSubmit (e){
        e.preventDefault()
        const res = await axios.post("api/catagories", {name})
        setName("")

        console.log(res.data)
    }
    return (
        <>
            <h1>Catagories</h1>
            <label>New Catagory name</label>
            <form className='flex gap-1' onSubmit={handleSubmit}>
                <input type='text' placeholder="catagory name "  className='mb-0' value={name} onChange={(e)=>setName(e.target.value)}/>

                <button type='submit' className='btn-primary'> Save</button>
            </form>

        </>
    )
}

export default Catagories