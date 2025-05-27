const express = require('express');
const router = express.Router();
const Model = require('../model/Model');
const User = require('../model/Users');
const bcrypt = require('bcryptjs');

// post method
router.post('/post',async (req,res)=>{
    const data = new Model({
        name:req.body.name,
        age:req.body.age
    })
    try{
        const dataToSave =  await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})
// get all method
router.get('/getAll', async(req,res)=>{
    try{
        const data =  await Model.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
// get by id method
router.get('/getOne/:id',async(req,res)=>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})
// upadte by id method
router.patch('/update/:id', async(res,req)=>{
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new:true};
        const result = await Model.findByIdAndUpdate(id,updatedData,options);
        res.send(result)
    }
    catch (error){
        res.status(400).json({message:error.message})
    }
    
})
// delete by id method
router.delete('/delete/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted`)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
    
})
// signup

router.post('/signup',async(req,res)=>{
    try{
        const {userName,email,password} = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({message:"User alreadt exist"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = new User({
            userName,
            email,
            password:hashedPassword
        })
        const savedUser = await user.save();
        res.status(201).json(savedUser)
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})


// login
router.post('/login',async(req,res)=>{
    
    try{
        const{email,password} =req.body;
        const user = await User.findOne({email});
        if(!user){
           return(
            res.status(400).json({message:"Invalid Credentials"})
           )
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return(
                res.status(400).json({message:"Invalid Credentials"})
            )
        }
        res.status(200).json({message:"Login Successfully",userId:user._id})
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports = router;