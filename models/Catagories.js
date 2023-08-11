import  mongoose, { Schema, model, models } from "mongoose";

const CatagorySchema = new Schema ({
    name: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref:"Catagory"},
    properties: {type: [Object]}
})

export const Catagory = models.Catagory || model("Catagory", CatagorySchema)