import express from 'express';
import mongoose from 'mongoose';
import {mongoDBURL} from './config.js'
import router from './routes/userroutes.js';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/', router);

const PORT = process.env.PORT || 5000;

mongoose
.connect(mongoDBURL)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
   console.log("connected to the database")
})
.catch((error) => {
    console.log(error);
    
})