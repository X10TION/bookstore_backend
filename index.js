import express from "express";
import { PORT,mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/books-route.js'
import cors from  'cors';


const app = express();
// middleware for persing req body

app.use(express.json());
app.use(cors({ origin: '*' }));


app.use('/bookstore', booksRoute);


mongoose
    .connect(mongoDBURl)
    .then(() =>{
        console.log("Applocation is connected to the database succesfully");
        app.listen(PORT, () => {
            console.log(`Application is listen to port : ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })