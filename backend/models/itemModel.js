import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, default: 0 },
    category: { type: String, default: "General" },
}, { timestamps: true } );

const Item = mongoose.model('Item', itemSchema);

export default Item;
