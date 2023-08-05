"use client"
import axios from "axios"
import { useRouter } from "next/navigation"

const NewProduct = () => {
    const router = useRouter()

    async function createProduct(e) {
        e.preventDefault()
        const data = { title: e.target.productName.value, description: e.target.productDes.value, price: e.target.productPrice.value }

        const status = await axios.post("/api/products", data)

        if(status.status === 200){
            router.push("/products")
        } else{
            alert("serverError, couldn't save now, the engineers are working on it. or you let the engineers know the problem")
        }
}
return (
    <form onSubmit={createProduct}>
        <h1 className="">New Product</h1>
        <label htmlFor="productName">Product name</label>
        <input id="productName" name="productName" required type="text" placeholder="products name" />

        <label htmlFor="productDes">Description</label>
        <textarea id="productDes" name="productDes" placeholder="description" />

        <label htmlFor="productPrice">Price (in USD)</label>
        <input id="productPrice" name="productPrice" type="number" placeholder="price" />

        <button type="submit" className="btn-primary">Save</button>
    </form>
)
}

export default NewProduct