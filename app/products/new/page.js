"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState, useRef, useEffect } from "react"

import Image from "next/image"
import { UploadButton } from "@uploadthing/react"
import "@uploadthing/react/styles.css";


const NewProduct = () => {
    const router = useRouter()

    const [images, setImages] = useState([])

    const [catagory, setCatagory] = useState("")
    const [allCatagories, setAllCatagories] = useState([])

    const [productProperties, setProductProperties] = useState({})

    useEffect(() => {
        axios.get("/api/catagories")
            .then(result => { setAllCatagories(result.data) })
    }, [])

    async function createProduct(e) {
        e.preventDefault()
        const data = { title: e.target.productName.value, description: e.target.productDes.value, price: e.target.productPrice.value, images, catagory, properties: productProperties }

        const status = await axios.post("/api/products", data)

        if (status.status === 200) {
            router.push("/products")
        } else {
            alert("serverError, couldn't save now, the engineers are working on it. or you let the engineers know the problem")
        }
    }

    const handleCancel = async () => {
        for (const img of images) {
            const key = img.split("/").pop()
            await axios.delete("/api/uploadthing?id=" + key)
        }

        router.push("/products")
    }


    function changeProductProp(propName, value) {
        setProductProperties(prev => {
            const newProductProp = { ...prev }
            newProductProp[propName] = value

            return newProductProp
        })
    }

    const propertiesToFill = []

    if (allCatagories.length > 0 && catagory) {
        let catInfo = allCatagories.find(({ _id }) => _id === catagory)

        propertiesToFill.push(...catInfo.properties)

        while (catInfo?.parent?._id) {
            const parentCat = allCatagories.find(({ _id }) => _id === catInfo?.parent?._id)

            propertiesToFill.push(...parentCat.properties)

            catInfo = parentCat
        }
    }

    const handleImgDelete = async (image) => {

        const newImages = images.filter(ele => ele != image)
        setImages(newImages)

        const key = image.split("/").pop()
        const res = await axios.delete("/api/uploadthing?id=" + key)
    }


    return (
        <form onSubmit={createProduct}>
            <h1 className="">New Product</h1>
            <label htmlFor="productName">Product name</label>
            <input id="productName" name="productName" required type="text" placeholder="products name" />

            <label htmlFor="catagories">Catagories</label>
            <select id="catagories" className="" value={catagory} onChange={e => {
                setCatagory(e.target.value)
            }}>
                <option value="">
                    Uncategorized
                </option>

                {allCatagories.map(catagory => (
                    <option key={catagory._id} value={catagory._id}> {catagory.name}</option>
                ))}
            </select>


            {propertiesToFill.length > 0 && propertiesToFill.map((p, ind) => (
                <div className="flex gap-1" key={ind}>
                    <label>{p.name[0]?.toUpperCase() + p.name.substring(1)} </label>

                    <select
                        value={productProperties[p.name] || ""}
                        onChange={(e) => changeProductProp(p.name, e.target.value)}
                    >
                        <option value=""> not selected</option>
                        {p.values.map((v, i) => (
                            <option value={v} key={i}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>
            )

            )}


            <label className="block">photos</label>
            <div className="flex flex-wrap gap-2 mt-1">
                {images.map(image =>
                    (<div 
                        className="imgInEdit border border-gray-200 flex items-center p-3 bg-white rounded-sm" onClick={() => handleImgDelete(image)} key={image}>

                    <Image src={image} alt="product block" width={100} height={100} />

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

            <div className="flex gap-3 mt-4">
                <button type="submit" className="btn-primary">Save</button>

                <button type="button" onClick={handleCancel}
                    className=" btn-reject">
                    Cancel
                </button>
            </div>
        </form>
    )
}

export default NewProduct