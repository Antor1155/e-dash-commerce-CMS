import { Catagory } from "../../../models/Catagories"
import { mongooseConnect } from "../../../database/mongoose"

export const POST = async (req, res) =>{
    const {name} = await req.json()

    try{
        await mongooseConnect()
        const CatagoryDoc = await Catagory.create({name})

        return new Response(JSON.stringify(CatagoryDoc), {status: 200})
    }catch(error){
        console.log("error in api/catagory/post ***, ")
    }

}

export const GET = async (req, res) =>{
    // const params = new URL(req.url).searchParams
    // const id = params.get("id")
    
    try{
        await mongooseConnect()
        const result = await Catagory.find()

        return new Response(JSON.stringify(result), {status: 200})
    }catch(error){
        console.log("error in api/catagory/get ***, ")
    }

}