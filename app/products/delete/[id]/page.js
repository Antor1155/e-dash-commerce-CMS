"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const DeleteProduct = ({ params }) => {
    const router = useRouter()

    const [product, setProduct] = useState()

    useEffect(() => {
        if (params.id) {
            axios.get("/api/products?id=" + params.id).then(
                response => setProduct(response.data)
            )
        }
    }, [params.id])

    const handleDelete = async () =>{
        if(params.id){
            const status = await axios.delete("/api/product?id=" + params.id)

            alert(status.status)
        }
    }

    const goBack = ()=>{
        router.push("/products")
    }
    return (
        <>
            <h1 className="text-center">Are you sure, you want to develte this product ?</h1>

            <div className="text-center my-5">
                <h1>Title : {product?.title}</h1>
                <h1>Description : {product?.description}</h1>
                <h1>Price : {product?.price}</h1>
            </div>

            <div className="flex gap-2 justify-center">
                <button className="btn-red" onClick={handleDelete}>Yes</button>
                <button className="btn-default" onClick={goBack}>No</button>
            </div>

            
        </>
    )
}

export default DeleteProduct