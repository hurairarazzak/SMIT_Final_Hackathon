import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
    {
        title: { type: String, required: true }, // Required field
        description: { type: String },
        price: { type: Number, default: 0 },
        category: { type: String, default: "General" },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
