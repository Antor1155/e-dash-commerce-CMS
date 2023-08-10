"use client"
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { UploadButton } from "@uploadthing/react"
import "@uploadthing/react/styles.css";

const EditProduct = ({ params }) => {
    const router = useRouter()

    const [images, setImages] = useState([])
    const [toDeleteImages, setToDeleteImages] = useState([])
    const newAddedImagesRef = useRef([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        axios.get("/api/products?id=" + params.id)
            .then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setImages(response.data.images)
            })
    }, [])

    const editProduct = async (e) => {
        e.preventDefault()

        const status = await axios.put("/api/products", { title, description, price, _id: params.id, images })

        if (status.status === 200) {
            for (const key of toDeleteImages) {
                await axios.delete("/api/uploadthing?id=" + key)
            }
            alert("product updated")
            router.push("/products")
        } else {
            alert("serverError, let the engineer know it")
        }
    }

    const handleImgDelete = async (image) => {

        const newImages = images.filter(ele => ele != image)
        setImages(newImages)

        const key = image.split("/").pop()
        const newToDeletImages = [...toDeleteImages, key]
        setToDeleteImages(newToDeletImages)
    }

    const handleCancel = async () =>{
        for (const img of newAddedImagesRef.current){
            const key = img.split("/").pop()
            await axios.delete("/api/uploadthing?id=" + key)
        }

        router.push("/products")
    }

    return (
        <>
            <form onSubmit={editProduct}>
                <h1 className="">Edit Product</h1>
                <label htmlFor="title">Product name</label>
                <input id="title" name="title" required type="text" placeholder="products name" value={title} onChange={e => setTitle(e.target.value)} />

                <label>photos</label>
                <div className="flex flex-wrap gap-2 mt-1">
                    {images.map(image => (<div className="imgInEdit border flex items-center" onClick={() => handleImgDelete(image)} key={image}>
                        <Image src={image} alt="product block" width={100} height={100} sizes="m(max-width: 100px)" />
                    </div>
                    ))}
                </div>

                <div className="flex my-3">
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            // Do something with the response
                            const newImages = [...images]
                            for (const ele of res) {
                                newImages.push(ele.url)
                                newAddedImagesRef.current.push(ele.url)

                            }
                            setImages(newImages)
                            // alert("Upload Completed");
                        }}
                        onUploadError={(error) => {
                            // Do something with the error.
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                </div>

                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="description" value={description} onChange={e => setDescription(e.target.value)} />

                <label htmlFor="price">Price (in USD)</label>
                <input id="price" name="price" type="number" placeholder="price" value={price} onChange={e => setPrice(e.target.value)} />

                <div className="flex gap-3 mt-4">
                    <button type="submit" className="btn-primary">Save</button>

                    <button type="button" onClick={handleCancel}
                        className=" bg-red-500 text-white border rounded-lg p-2">
                        Cancel
                    </button>
                </div>
            </form>
        </>
    )
}

export default EditProduct