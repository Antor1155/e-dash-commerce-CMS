"use client"
import axios from "axios"

const NewProduct =  () => {
    async function createProduct(e){
        e.preventDefault()
        const data = {title: e.target.productName.value, description: e.target.productDes.value, price: e.target.productPrice.value}

        console.log(data)

        await axios.post("/api/products", data)
        
        // e.target.productDes.value = e.target.productName.value = e.target.productPrice.value = ""
    }
    return (
        <form onSubmit={createProduct}>
            <h1 className="">New Products</h1>
            <label htmlFor="productName">Product name</label>
            <input id="productName" name="productName" required type="text" placeholder="products name" />

            <label htmlFor="productDes">Description</label>
            <textarea id="productDes" name="productDes" placeholder="description" />

            <label htmlFor="productPrice">Price (in USD)</label>
            <input id="productPrice" name="productPrice" type="text" placeholder="price" />

            <button type="submit" className="btn-primary">Save</button>
        </form>
    )
}

export default NewProduct