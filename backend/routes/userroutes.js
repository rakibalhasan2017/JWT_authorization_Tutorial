import express from 'express';
import { user } from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(name && email && password) {
            const registereduser = await user.findOne({name});
            if(registereduser) {
                res.status(400).send("this username is already registered");
            } 
            else {
                const hashedPassword = await bcrypt.hash(password, 10); 
                const newuser = await user.create({
                    name,
                    email,
                    password: hashedPassword
                })
                res.status(201).send("Successfully registered");
                 console.log(newuser);
                
            }
        }
        else {
            res.status(400).send("fill all the field");
        }
    }
    catch(error) {
        console.log("error happened");
        res.status(400).send(error);
        
    }
});


export default router;