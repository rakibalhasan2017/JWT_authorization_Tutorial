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

router.post('/login', async(req, res) => {
    try {
        const {name, password} = req.body;
        if(name && password) {
            const existeduser = await user.findOne({name});
            console.log(existeduser);
            
            if(existeduser) {
                const hashedPassword = existeduser.password;
                const isMatch = await bcrypt.compare(password, hashedPassword);
                if(isMatch) {
                    console.log("password match");
                    console.log(process.env.SECRET_KEY);
                    
                    const token = jwt.sign({ "username": name }, process.env.SECRET_KEY, 
                        {expiresIn: "1h"
                        }
                    )
                    res.status(200).json({
                        "msg": "login suucessfull!!!",
                        "token": token
                    })
                }
                else {
                    console.log("wrong password");
                    res.status(400).send("wrong password");
                }
            }
            else {
                res.status(400).send("not registereed user")
            }
        }
        else {
            console.log("error happened");
            res.status(400).send("fill all field");
        }
    }
    catch(error) {
        console.log("error happened");
        res.status(400).send(error);
        
    }
    
})



export default router;