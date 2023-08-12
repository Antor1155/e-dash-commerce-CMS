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
    const [catagory, setCatagory] = useState("")

    const [productProperties, setProductProperties] = useState({})

    const [allCatagories, setAllCatagories] = useState([])

    useEffect(() => {
        axios.get("/api/products?id=" + params.id)
            .then(response => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setPrice(response.data.price)
                setImages(response.data.images)
                setCatagory(response.data.catagory)
                setProductProperties(response.data.properties || {})
            })
        axios.get("/api/catagories").then(result => {
            setAllCatagories(result.data)
        })
    }, [])

    const editProduct = async (e) => {
        e.preventDefault()

        const status = await axios.put("/api/products", { title, description, price, _id: params.id, images, catagory, properties: productProperties })

        if (status.status === 200) {
            for (const key of toDeleteImages) {
                await axios.delete("/api/uploadthing?id=" + key)
            }
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

    const handleCancel = async () => {
        for (const img of newAddedImagesRef.current) {
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


    return (
        <>
            <form onSubmit={editProduct}>
                <h1 className="">Edit Product</h1>
                <label htmlFor="title">Product name</label>
                <input id="title" name="title" required type="text" placeholder="products name" value={title} onChange={e => setTitle(e.target.value)} />

                <label htmlFor="catagories">Catagories</label>
                <select id="catagories" className="w-auto ml-2" value={catagory || ""} onChange={e => {
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
                        <div>{p.name} </div>

                        <select
                            value = {productProperties[p.name] || ""}
                            onChange={(e) => changeProductProp(p.name, e.target.value)}
                        >
                            <option value="">not selected</option>
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