"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import Image from "next/image"
import { UploadButton } from "@uploadthing/react"
import "@uploadthing/react/styles.css";

const NewProduct = () => {
    const router = useRouter()

    const [images, setImages] = useState([])

    async function createProduct(e) {
        e.preventDefault()
        const data = { title: e.target.productName.value, description: e.target.productDes.value, price: e.target.productPrice.value, images }

        const status = await axios.post("/api/products", data)

        if (status.status === 200) {
            router.push("/products")
        } else {
            alert("serverError, couldn't save now, the engineers are working on it. or you let the engineers know the problem")
        }
    }

    return (
        <form onSubmit={createProduct}>
            <h1 className="">New Product</h1>
            <label htmlFor="productName">Product name</label>
            <input id="productName" name="productName" required type="text" placeholder="products name" />

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

            <label htmlFor="productDes">Description</label>
            <textarea id="productDes" name="productDes" placeholder="description" />

            <label htmlFor="productPrice">Price (in USD)</label>
            <input id="productPrice" name="productPrice" type="number" placeholder="price" />

            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}

export default NewProduct