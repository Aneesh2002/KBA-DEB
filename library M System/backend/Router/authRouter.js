import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import { authenticate } from "../Middileware/auth.js";

dotenv.config();
const SecretKey=process.env.SecretKey
const userSchema = new mongoose.Schema({

    username:String,
    email:{
        type:String,
        unique:true
    },
    password:String,
    userRole:String
})

const User = mongoose.model("userDetails",userSchema)

const bookSchema = new mongoose.Schema({
    bookid:String,
    bookname:String,
    authname:String,
    description:String
 
})

const Book = mongoose.model("bookDetails",bookSchema)

mongoose.connect("mongodb://localhost:27017/LIBRARY-SYSTEM")

const adminRouters = Router()

adminRouters.post('/signup',async(req,res)=>{

    const {UserName,Email,Password,Role} =req.body

    const existingEmail = await User.findOne({username:UserName})

    try {
        if(existingEmail){
            res.status(400).json({message:"Username Already exist"})
        }else{
    
             const newP = await bcrypt.hash(Password,10)
    
            const newUser = new User({
                username:UserName,
                email:Email,
                password:newP,
                userRole:Role
            })
    
            await newUser.save();
    
            res.status(201).json({message:"Register Successfull"})
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
        

    }
   

    
})

adminRouters.post('/login',async(req,res)=>{
    const data = req.body;
    const { UserName, Password } = data;

    const result =await Book.findOne({username:UserName})
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if (invalid) {

            const token = jwt.sign({ UserName: UserName, Role: result.Role }, SecretKey, { expiresIn: "1h" })
            console.log(token)
            res.cookie('authToken', token, {
                httpOnly: true
            });
            res.status(200).json({ message: "Success" })
        }
        else {
            res.status(403).json({ Message: "Password Is Correct" })
        }

    }
    else {
        res.status(403).json({ message: "User is not exisit" })
    }



})
    
adminRouters.post("/addBook",authenticate, async(req,res)=>{
     
    const {BookID,BookName,AuthorName,Description} =req.body

    const result = await  Book.findOne({bookid:BookID})
try {
    if(result){

       return res.status(400).json({message:"Book Already exist"})

    }
     if( req.Role == "admin"){

        const newBook = new Book({
            bookid:BookID,
            bookname:BookName,
            authname:AuthorName,
            description:Description
        })
        await newBook.save();

        res.status(200).json({message:"Book Added"})
     }else{
        res.status(401).json({message:"Unauthorized user"})
     }

    
} catch (error) {
    res.status(500).json(error)
    console.log(error);
}
    
})


adminRouters.get("/getBook/:bname",authenticate, async(req,res)=>{

    const bookid=req.params.bname
    
    const result = await Book.findOne({bookid:bookid})
try {
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({message:"not found the book"})
    } 
} catch (error) {
    res.status(500).json(error)
}
  
});



adminRouters.get("/getAllBooks",async(req,res)=>{

    
    const result = await Book.find()
try {
    if(result){
        res.status(200).json(Array.from(result.entries()))

    }else{
        res.status(404).json({message:"There is no Books added found the book"})
    } 
} catch (error) {
    res.status(500).json(error)
}
  
});

adminRouters.get('/viewUser',authMiddileware,(req,res)=>{
    try{
    const user=req.Role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})

adminRouters.delete('/deleteBook/:ctitle',authenticate,async(req,res)=>{
    try{
    const title=req.params.ctitle;

    const result = await Book.findOneAndDelete({bookid:title})
   

    if(!result){
        return   res.status(401).json({message:"Book is not found"})
    }

    if(req.Role == "Admin"){
       return res.status(200).json({message:"Book Deleted"})
    }else{
        res.status(401).json({message:"error Unauthorized User"})
    }
}
   catch(error){
        res.status(500).json({message:error});
    }
})

adminRouters.post('/logout',authenticate, (req, res) => {
    res.clearCookie("bToken");
    res.status(200).json({ message: "Logout successful" });
});

// adminRouters.get('/viewCourse', async(req,res)=>{

//     const result = 
//     try{
      

//         if(course.size!=0){
           
            
//         res.send(Array.from(course.entries()))
//     }
// else{
//     res.status(404).json({message:'Not Found'});
// }}
//     catch{
//         res.status(404).json({message:"Internal error"})
//     }
// })

export {adminRouters}