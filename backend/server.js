import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv/config";
import userRoute from './routes/userRoute.js'
import itemRoute from './routes/itemRoutes.js'

const app = express();
app.use(express.json());

app.use(cors())

app.use('/user', userRoute);
app.use('/api/items', itemRoute);

app.get("/", (req, res) => {
    res.send("Server Started")
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, (req, res) => {
            console.log("DB Connected And Server Started.");
        })
    })
    .catch((error) => {
        console.log(error);
    })