"use client"
import axios from "axios"
import { useState, useEffect } from "react"

const Catagories = () => {
    const [name, setName] = useState("")
    const [parentCatagory, setParentCatagory] = useState("")

    const [allCatagories, setAllCatagories] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()
        const res = await axios.post("/api/catagories", { name, parentCatagory })
        setName("")
        setParentCatagory("")
        fetchCatagories()
    }

    useEffect(() => {
        fetchCatagories()
    }, [])

    function fetchCatagories (){
        axios.get("/api/catagories")
        .then(result => setAllCatagories(result.data))
        .catch(error => console.log(error))
    }

    return (
        <>
            <h1>Catagories</h1>
            <label>New Catagory name</label>
            <form className='flex gap-1' onSubmit={handleSubmit}>
                <input type='text' placeholder="catagory name " className='mb-0' value={name} onChange={(e) => setName(e.target.value)} required/>

                <select className="mb-0"
                        value={parentCatagory}
                        onChange={e =>setParentCatagory(e.target.value)}>

                    <option value="">
                        No parent
                    </option>
                    {allCatagories.length && allCatagories.map(catagory => (
                        <option key={catagory._id} value={catagory._id}>
                            {catagory.name}
                        </option>
                    ))}
                </select>

                <button type='submit' className='btn-primary'> Save</button>
            </form>

            <table className="basic mt-2">
                <thead>
                    <tr>
                        <td> Catagory name</td>
                        <td> Parent catagory</td>
                    </tr>
                </thead>
                <tbody>
                    {allCatagories.length && allCatagories.map(catagory => (
                        <tr key={catagory._id}>
                            <td> {catagory.name} </td>
                            <td>{catagory.parent?.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default Catagories