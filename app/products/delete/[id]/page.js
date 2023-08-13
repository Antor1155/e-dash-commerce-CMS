"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const DeleteProduct = ({ params }) => {
    const router = useRouter()

    const [product, setProduct] = useState({})

    useEffect(() => {
        if (params.id) {
            axios.get("/api/products?id=" + params.id).then(
                response => setProduct(response.data)
            )
        }
    }, [params.id])

    const handleDelete = async () => {
        if (params.id) {
            const status = await axios.delete("/api/products?id=" + params.id)
            
            // delete all images from storage cloud 
            for (const img of product?.images) {
                const key = img.split("/").pop()
                await axios.delete("/api/uploadthing?id=" + key)
            }

            if (status.status === 200) {
                alert("Deleted Successfully")
                goBack()
            } else {
                alert("server error, let the engineer know it")
            }
        }
    }

    const goBack = () => {
        router.push("/products")
    }
    return (
        <>
            <h1 className="text-center">Are you sure, you want to develte this product ?</h1>

            <div className="flex justify-center">
                {product?.images?.map(im => (
                    <Image key={im} src={im} width={100} height={100} alt="product img" />
                ))

                }
            </div>

            <div className="text-center my-5">
                <h1>Title : {product?.title}</h1>
                <h1>Description : {product?.description}</h1>
                <h1>Price : {product?.price}</h1>
                <h1>Catagory: {product?.catagory || " "}</h1>
            </div>

            <div className="flex gap-2 justify-center">
                <button className="btn-reject" onClick={handleDelete}>Yes</button>
                <button className="btn-gray" onClick={goBack}>No</button>
            </div>


        </>
    )
}

export default DeleteProduct