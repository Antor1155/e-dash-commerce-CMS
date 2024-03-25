import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    line_items:Object,
    name: String,
    city: String,
    email: String,
    postalCode: String,
    streetAddress: String,
    country: String,
    padi: Boolean,
}, {
    timestamps: true,
})

export const Order = models?.Order || model("Order", OrderSchema)

