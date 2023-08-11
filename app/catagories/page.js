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
            properties: properties.map(p =>({
                name: p.name, 
                values: p.values.split(",")})) 
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
                        className="btn-default text-sm mb-2">
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
                                        onClick={() => handleDeleteCatagory(catagory)}>
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