"use client"
import axios from "axios"
import { useEffect, useState } from "react"

const EditProduct = ({ params }) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")


    useEffect(() => {
        axios.get("/api/products?id=" + params.id)
            .then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setPrice(response.data.price)
            })
    }, [])

    const editProduct = async (e) => {
        e.preventDefault()

        await axios.put("/api/products", {title, description, price, _id:params.id})
    }

    return (
        <>
            <form onSubmit={editProduct}>
                <h1 className="">Edit Product</h1>
                <label htmlFor="title">Product name</label>
                <input id="title" name="title" required type="text" placeholder="products name" value={title} onChange={e => setTitle(e.target.value)}/>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="description" value={description} onChange={e => setDescription(e.target.value)}/>

                <label htmlFor="price">Price (in USD)</label>
                <input id="price" name="price" type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)}/>

                <button type="submit" className="btn-primary">Save</button>
            </form>
        </>
    )
}

export default EditProduct