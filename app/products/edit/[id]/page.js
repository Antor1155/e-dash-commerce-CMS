"use client"
import axios from "axios"
import { useEffect, useState } from "react"

const EditProduct = ({ params }) => {
    const [product, setProduct] = useState()
    const id = params.id

    useEffect(()=>{
        axios.get("/api/products?id=" + id)
        .then(response => setProduct(response.data))
    }, [])

    console.log(product)
    return (
        <div>Product edit page {params.id}</div>
    )
}

export default EditProduct