import { Order } from "../../../models/Order"
import { mongooseConnect } from "../../../database/mongoose"

export const GET = async (req, res) => {
    try {
        await mongooseConnect()
        const result = await Order.find().sort({ createdAt: -1 })

        return new Response(JSON.stringify(result), {status: 200})

    } catch (error) {
        return new Response(JSON.stringify("error in api"), {status: 500})
    }
}