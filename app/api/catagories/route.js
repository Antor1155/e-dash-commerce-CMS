import { Catagory } from "../../../models/Catagories"
import { mongooseConnect } from "../../../database/mongoose"
import { getServerSession } from "next-auth"

// async function usingSession (req){
//     const session = await getServerSession(req)
//     console.log(session)
// }

export const GET = async (req, res) => {

    // usingSession(req)

    try {
        await mongooseConnect()
        const result = await Catagory.find().populate("parent")

        return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/get ***, ")
    }

}


export const POST = async (req, res) => {
    const { name, parentCatagory, properties } = await req.json()

    try {
        await mongooseConnect()

        let CatagoryDoc = await Catagory.create({ name, properties, parent: parentCatagory || null })

        return new Response(JSON.stringify(CatagoryDoc), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/post ***, ",)
        console.log(error)
    }

}

export const PUT = async (req, res) => {
    const { name, parentCatagory, _id, properties } = await req.json()

    try {
        await mongooseConnect()

        let CatagoryDoc = await Catagory.updateOne({ _id }, { name, properties, parent: parentCatagory || null })


        return new Response(JSON.stringify(CatagoryDoc), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/put ***, ")
        console.log(error)
    }
}

export const DELETE = async (req, res) => {
    const params = new URL(req.url).searchParams
    const _id = params.get("id")

    try {
        await mongooseConnect()

        await Catagory.deleteOne({ _id })

        return new Response(JSON.stringify("deleted successfully"), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/delete ***, ")
        console.log(error)
    }
}

