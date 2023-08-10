import { Catagory } from "../../../models/Catagories"
import { mongooseConnect } from "../../../database/mongoose"

export const POST = async (req, res) =>{
    const {name} = await req.json()
    
    try{
        await mongooseConnect()
        const CatagoryDoc = await Catagory.create({name})

        return new Response(JSON.stringify(CatagoryDoc, {status: 200}))
    }catch(error){
        console.log("error in api/catagory ***, ")
    }

}