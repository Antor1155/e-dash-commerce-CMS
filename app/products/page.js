"use client"
import Link from "next/link"
import axios from "axios"
import { useEffect } from "react"

export default function Products(){
    useEffect(()=>{
        axios.get("/api/products").then(response => console.log(response.data))


    }, [])
    return (
        <div>
            <Link href={"/products/new"} className="btn-primary">Add new Products</Link>
        </div>
    )
}