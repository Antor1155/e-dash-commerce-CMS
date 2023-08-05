"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

const NewProduct = () => {
    const router = useRouter()

    const [photos, usePhotos] = useState([])

    async function createProduct(e) {
        e.preventDefault()
        const data = { title: e.target.productName.value, description: e.target.productDes.value, price: e.target.productPrice.value }

        const status = await axios.post("/api/products", data)

        if (status.status === 200) {
            router.push("/products")
        } else {
            alert("serverError, couldn't save now, the engineers are working on it. or you let the engineers know the problem")
        }
    }


    function updoadImages(e){
        console.log(e)
    }
    return (
        <form onSubmit={createProduct}>
            <h1 className="">New Product</h1>
            <label htmlFor="productName">Product name</label>
            <input id="productName" name="productName" required type="text" placeholder="products name" />

            <label>photos</label>
            <div className="mb-2">
                <label className="w-24 h-24 text-center flex flex-col items-center justify-center text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>

                    <input type="file" className="hidden" onChange={updoadImages}/>
                    <small>
                        upload
                    </small>
                </label>
                {!photos.length && <div> No photos in this product</div>}
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