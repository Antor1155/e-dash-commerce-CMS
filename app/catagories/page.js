"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { withSwal } from 'react-sweetalert2';

const Catagories = ({swal}) => {
    const [name, setName] = useState("")
    const [parentCatagory, setParentCatagory] = useState("")

    const [allCatagories, setAllCatagories] = useState([])
    const [editedCatagory, setEditedCatagory] = useState()

    async function handleSubmit(e) {
        e.preventDefault()
        if (editedCatagory) {
            const res = await axios.put("/api/catagories", { name, parentCatagory, _id: editedCatagory._id })
        } else {
            const res = await axios.post("/api/catagories", { name, parentCatagory })
        }

        fetchCatagories()

        setName("")
        setParentCatagory("")
        setEditedCatagory("")
    }

    useEffect(() => {
        fetchCatagories()
    }, [])

    function fetchCatagories() {
        axios.get("/api/catagories")
            .then(result => setAllCatagories(result.data))
            .catch(error => console.log(error))
    }

    function editCatagory(catagory) {
        setEditedCatagory(catagory)
        setName(catagory.name)

        setParentCatagory(catagory?.parent?._id || "")

    }

    function handleCancelEdit(){
        setName("")
        setParentCatagory("")
        setEditedCatagory("")
    }

    function handleDeleteCatagory(catagory){
        swal.fire({
            title: 'Are you Sure ?',
            text: `Do you want to delet : ${catagory.name}`,
            showCancelButton: true,
            confirmButtonText: "Yes, Delete!",
            confirmButtonColor: "#d55",
            reverseButtons: true,
        }).then(result =>{

            if(result.isConfirmed){
                axios.delete("/api/catagories?id=" + catagory._id)
                
                fetchCatagories()
            }

        }).catch(error => console.log(error))

    }


    return (
        <>
            <h1>Catagories</h1>
            <label>
                {editedCatagory ? "Edit catagory ' " + editedCatagory.name + " '" : "New Catagory name"}
            </label>
            <form className='flex gap-1' onSubmit={handleSubmit}>
                <input type='text' placeholder="catagory name " className='mb-0' value={name} onChange={(e) => setName(e.target.value)} required />

                <select className="mb-0"
                    value={parentCatagory}
                    onChange={e => setParentCatagory(e.target.value)}>

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
                <button type='submit' className='btn-reject' onClick={handleCancelEdit}> Cancel</button>
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
                            <td>
                                <button className="btn-primary mr-1"
                                    onClick={() => editCatagory(catagory)}>
                                    Edit
                                </button>
                                <button className="btn-reject"
                                    onClick={() =>handleDeleteCatagory(catagory)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default withSwal(({swal}, ref) => (
    <Catagories swal={swal}/>
))