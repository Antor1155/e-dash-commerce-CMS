import { Catagory } from "../../../models/Catagories"
import { mongooseConnect } from "../../../database/mongoose"

export const GET = async (req, res) => {
    // const params = new URL(req.url).searchParams
    // const id = params.get("id")

    try {
        await mongooseConnect()
        const result = await Catagory.find().populate("parent")

        return new Response(JSON.stringify(result), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/get ***, ")
    }

}


export const POST = async (req, res) => {
    const { name, parentCatagory } = await req.json()

    try {
        await mongooseConnect()

        let CatagoryDoc = await Catagory.create({ name, parent: parentCatagory || null })

        return new Response(JSON.stringify(CatagoryDoc), { status: 200 })
    } catch (error) {
        console.log("error in api/catagory/post ***, ",)
        console.log(error)
    }

}

export const PUT = async (req, res) => {
    const { name, parentCatagory, _id } = await req.json()

    try {
        await mongooseConnect()

        let CatagoryDoc = await Catagory.updateOne({ _id }, { name, parent: parentCatagory || null })


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

