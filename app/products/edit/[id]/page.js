"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const EditProduct = ({ params }) => {
    const router = useRouter()

    const [photos, usePhotos] = useState([])

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

        const status = await axios.put("/api/products", { title, description, price, _id: params.id })

        if (status.status === 200) {
            alert("product updated")
            router.push("/products")
        } else {
            alert("serverError, let the engineer know it")
        }
    }

    
    async function updoadImages(e){
        const files = e.target.files
        
        if(files?.length> 0){
            const data = new FormData()
            
            for (const file of files){
                data.append("file", file)
            }
            
            console.log("data is : ", data)
            const res = await axios.post("/api/upload", data) 

            console.log("res on Image upload ***: ", res)
        }

    }

    return (
        <>
            <form onSubmit={editProduct}>
                <h1 className="">Edit Product</h1>
                <label htmlFor="title">Product name</label>
                <input id="title" name="title" required type="text" placeholder="products name" value={title} onChange={e => setTitle(e.target.value)} />

                <label>photos</label>
                <div className="mb-2">
                    <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>

                        <input type="file" className="hidden" onChange={updoadImages} />
                        <small>
                            upload
                        </small>
                    </label>
                    {!photos.length && <div> No photos in this product</div>}
                </div>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />

                <label htmlFor="price">Price (in USD)</label>
                <input id="price" name="price" type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)} />

                <button type="submit" className="btn-primary">Save</button>
            </form>
        </>
    )
}

export default EditProduct