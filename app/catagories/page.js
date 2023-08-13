"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { withSwal } from 'react-sweetalert2';

const Catagories = ({ swal }) => {
    const [name, setName] = useState("")
    const [parentCatagory, setParentCatagory] = useState("")

    const [allCatagories, setAllCatagories] = useState([])
    const [editedCatagory, setEditedCatagory] = useState()

    const [properties, setProperties] = useState([])

    async function handleSubmit(e) {
        e.preventDefault()

        const data = {
            name,
            parentCatagory,
            properties: properties.map(p => ({
                name: p.name,
                values: p.values.split(",")
            }))
        }

        if (editedCatagory) {
            data._id = editedCatagory._id
            const res = await axios.put("/api/catagories", data)
        } else {
            const res = await axios.post("/api/catagories", data)
        }

        handleClearAll()
        fetchCatagories()

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

        const processedProperties = catagory.properties.map(p => ({ name: p.name, values: p.values.join(",") }))

        setProperties(processedProperties)

    }

    function handleClearAll() {
        setName("")
        setParentCatagory("")
        setEditedCatagory(null)
        setProperties([])
    }

    function handleDeleteCatagory(catagory) {
        swal.fire({
            title: 'Are you Sure ?',
            text: `Do you want to delet : ${catagory.name}`,
            showCancelButton: true,
            confirmButtonText: "Yes, Delete!",
            confirmButtonColor: "#d55",
            reverseButtons: true,
        }).then(result => {

            if (result.isConfirmed) {
                axios.delete("/api/catagories?id=" + catagory._id)

                fetchCatagories()
            }

        }).catch(error => console.log(error))

    }

    function addProperty() {
        setProperties(prev => {
            return [...prev, { name: "", values: "" }]
        })
    }

    function handlePropertyNameChange(index, property, newName) {
        setProperties(prev => {
            const properties = [...prev]
            properties[index].name = newName

            return properties
        })
    }

    function handlePropertyValuesChange(index, property, newValues) {
        setProperties(prev => {
            const properties = [...prev]
            properties[index].values = newValues

            return properties
        })
    }

    function removeProperty(indexToDel) {
        setProperties(prev => {
            const newProperties = [...prev].filter((p, ind) => ind != indexToDel)

            return newProperties
        })
    }

    return (
        <>
            <h1>Catagories</h1>
            <label>
                {editedCatagory ? "Edit catagory ' " + editedCatagory.name + " '" : "New Catagory name"}
            </label>
            <form className='' onSubmit={handleSubmit}>
                <div className="flex gap-1">

                    <input type='text' placeholder="catagory name " className='' value={name} onChange={(e) => setName(e.target.value)} required />

                    <select className=""
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
                </div>

                <div className="mb-2">
                    <label className="block">Properties</label>
                    <button
                        onClick={addProperty}
                        type="button"
                        className="btn-gray text-sm my-2">
                        Add new property
                    </button>

                    {properties.length > 0 && properties.map((property, index) => (
                        <div key={index} className="flex gap-1 mb-2">

                            <input
                                className="mb-0"
                                type="text"
                                placeholder="property name (ex: color)"
                                value={property.name}
                                onChange={e => handlePropertyNameChange(index, property, e.target.value)}
                            />
                            <input
                                className="mb-0"
                                type="text"
                                placeholder="values, comma seperated"
                                value={property.values}
                                onChange={e => handlePropertyValuesChange(index, property, e.target.value)}
                            />

                            <button
                                type="button"
                                className="btn-default"
                                onClick={() => removeProperty(index)}
                            >
                                remove
                            </button>
                        </div>
                    ))}
                </div>

                <button type='submit' className='btn-primary mr-1'> Save</button>
                <button type='submit' className='btn-reject' onClick={handleClearAll}> Cancel</button>

            </form>

            {!editedCatagory &&

                <table className="basic mt-4">
                    <thead>
                        <tr>
                            <td> Catagory name</td>
                            <td> Parent catagory</td>
                            <td> </td>
                        </tr>
                    </thead>
                    <tbody>
                        {allCatagories.length > 0 && allCatagories.map(catagory => (
                            <tr key={catagory._id}>
                                <td> {catagory.name} </td>
                                <td>{catagory.parent?.name}</td>
                                <td className="text-sm flex">
                                    <button className="btn-default flex items-center mr-2"
                                        onClick={() => editCatagory(catagory)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Edit
                                    </button>
                                    <button className="btn-reject flex items-center"
                                        onClick={() => handleDeleteCatagory(catagory)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }

        </>
    )
}

export default withSwal(({ swal }, ref) => (
    <Catagories swal={swal} />
))