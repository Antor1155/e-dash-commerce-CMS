import { Schema, model, models } from "mongoose";

const CatagorySchema = new Schema ({
    name: {type: String, required: true}
})

export const Catagory = models.Catagory || model("Catagory", CatagorySchema)