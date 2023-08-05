import { Product } from "@/models/Product"
import { mongooseConnect } from "@/database/mongoose"
import { mongo } from "mongoose";


export const GET = async (req, res) => {
    const params = new URL(req.url).searchParams;
    const id = params.get("id")

    try {
        await mongooseConnect()
        let allProducts;

        if (id) {
            allProducts = await Product.findById(id)
        } else {
            allProducts = await Product.find()
        }

        return new Response(JSON.stringify(allProducts), { status: 200 })

    } catch (error) {
        console.log("products/route/get error ***: ", error)
        return new Response("products/route/get error*** ", { status: 500 })
    }
}

export const POST = async (req, res) => {
    const data = await req.json()
    try {
        await mongooseConnect()

        const { title, description, price } = data

        const newProduct = new Product({
            title, description, price
        })

        newProduct.save()
        return new Response("got it ", { status: 200 })
    } catch (error) {
        console.log("products/route/post error ***: ", error)
        return new Response("products/route/post error *** ", { status: 500 })
    }
}

export const PUT = async (req, res) =>{
    try{
        await mongooseConnect()

        const {title, description, price, _id} = await req.json()
        await Product.updateOne({_id}, {title, description, price})
        
        return new Response("success", {status:200})
    }catch(error){
        console.log("error in product/route/put *** ",error)
        return new Response("failed in products/route put method")
    }
}

export const DELETE = async (req, res) =>{
    
    try{
        const param = new URL(req.url).searchParams
        const id = param.get("id")
        
        console.log("reached delete *** ", id)
        await mongooseConnect()

        if(id){ 
            await Product.deleteOne({_id: id})
        }

        return new Response("success deletion", {status: 200})
    }catch(error){
        console.log("error in product/route/delete", error)
        return new Response("failed in products/route/delete", {status: 400})
    }
}
