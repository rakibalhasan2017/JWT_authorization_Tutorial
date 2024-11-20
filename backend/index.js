import express from 'express';
import mongoose from 'mongoose';
import {mongoDBURL} from './config.js'
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(201).json({msg: "start the project"})
})

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