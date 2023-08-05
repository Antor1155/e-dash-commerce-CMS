import { Product } from "@/models/Product"
import { mongooseConnect } from "@/database/mongoose"


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
        console.log("products route error ***: ", error)
        return new Response("server error*** ", { status: 500 })
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
        console.log("products route error ***: ", error)
        return new Response("server error*** ", { status: 500 })
    }
}

export const PUT = async (req, res) =>{
    try{
        const {title, description, price, _id} = await req.json()
        await Product.updateOne({_id}, {title, description, price})
        
        return new Response("success", {status:200})
    }catch(error){
        console.log("error in product/route.js/put *** ",error)
        return new Response("failed in products/route.js put method")
    }
}
