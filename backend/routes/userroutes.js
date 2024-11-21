import express from 'express';
import { user } from '../models/usermodel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import checklogin from '../middlewares/checklogin.js';

const router = express.Router();

router.post('/register', async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if(name && email && password) {
            const registereduser = await user.findOne({name});
            console.log(registereduser);
            
            if(registereduser) {
                res.status(400).send("this username is already registered");
            } 
            else {
                const hashedPassword = await bcrypt.hash(password, 10); 
                console.log(hashedPassword);
                const newUser = new user({
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                });
                
                await newUser.save(); // Save the user to the database
                console.log(newUser);
                res.status(201).send("Successfully registered");
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

router.post('/login',  async(req, res) => {
    try {
        const {name, password} = req.body;
        if(name && password) {
            const existeduser = await user.findOne({name});
            if(existeduser) {
                const hashedPassword = existeduser.password;
                const isMatch = await bcrypt.compare(password, hashedPassword);
                if(isMatch) {
                    console.log("password match");
                    
                    const token = jwt.sign({ "name": name }, process.env.SECRET_KEY, 
                        {expiresIn: "1h"
                        }
                    )
                    res.status(200).json({
                        "msg": "login suucessfull!!!",
                        "token": token,
                        "name": name
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

router.post('/changepassword', checklogin, async(req, res) => {
    try {
        const {newpassword, confirmpassword} = req.body;
        if(newpassword && confirmpassword) {
            if(newpassword === confirmpassword) {
                const hashedPassword = await bcrypt.hash(newpassword, 10);
                console.log(req.name);
                
                const updatedUser = await user.findOneAndUpdate(
                    {name: req.name}, 
                    { $set: { password: hashedPassword } }, 
                    { new: true, runValidators: true } 
                );
                console.log(updatedUser);
                if (!updatedUser) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json({
                    message: "Password updated successfully",
                    user: {
                        name: updatedUser.name,
                        email: updatedUser.email,
                    },
                });
            }
            else {
                res.status(400).send("newpassword and confirmpassword doesnot match");
            }
        }
        else {
            console.log("fill all the fields");
            res.status(400).send("fill all the fields");
        }
    }
    catch(error) {
        console.log("error happened");
        res.status(400).send("check the login");
        
    }

})



export default router;