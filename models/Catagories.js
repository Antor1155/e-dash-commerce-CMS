import  mongoose, { Schema, model, models } from "mongoose";

const CatagorySchema = new Schema ({
    name: {type: String, required: true},
    parent: {type: mongoose.Types.ObjectId, ref:"Catagory"},
})

export const Catagory = models.Catagory || model("Catagory", CatagorySchema)