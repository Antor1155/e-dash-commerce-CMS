import { Catagory } from "../../../models/Catagories"
import { mongooseConnect } from "../../../database/mongoose"

export const GET = async (req, res) =>{
    // const params = new URL(req.url).searchParams
    // const id = params.get("id")
    
    try{
        await mongooseConnect()
        const result = await Catagory.find().populate("parent")

        return new Response(JSON.stringify(result), {status: 200})
    }catch(error){
        console.log("error in api/catagory/get ***, ")
    }

}


export const POST = async (req, res) =>{
    const {name, parentCatagory} = await req.json()

    try{
        await mongooseConnect()
        let CatagoryDoc;
        if(parentCatagory){
            CatagoryDoc = await Catagory.create({name, parent: parentCatagory})
        } else{
            CatagoryDoc = await Catagory.create({name})
        }

        return new Response(JSON.stringify(CatagoryDoc), {status: 200})
    }catch(error){
        console.log("error in api/catagory/post ***, ")
    }

}

