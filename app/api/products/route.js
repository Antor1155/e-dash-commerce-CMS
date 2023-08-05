import { Product } from "@/models/Product"
import { mongooseConnect } from "@/database/mongoose"

export const POST = async (req, res)=>{
    const data = await req.json()
    try{
        await mongooseConnect()
        
        const {title, description, price} = data
        
        const newProduct = new Product({
            title, description, price
        })

        newProduct.save()
        return new Response("got it ", {status: 200})
    }catch(error){
        console.log("products route error ***: ",error)
        return new Response("server error*** ", {status: 500})
    }


}