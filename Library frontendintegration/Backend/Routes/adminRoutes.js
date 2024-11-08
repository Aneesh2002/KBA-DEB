import { json, Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authenticate } from "../middleware/auth.js";


dotenv.config();
const Route = Router();
const user = new Map();
const book = new Map();

Route.use(json());
const secretkey =process.env.SecretKey



Route.post('/signup', async (req, res) => {
    console.log("hii")

    try {
        const data = req.body;
        const { UserName, Email, Password, Role } = data
        const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)

        if (user.has(UserName)) {
            res.status(400).json({ message: "user already exists" })
        } else {
            user.set(UserName, { Email, Password: newPass, Role })
        
            
            res.status(201).json({message:"data saved"})
        }
        console.log(user.get(UserName))
        
    }
    catch (error) {
        res.status(500).json(error);

    }


})
Route.post('/login',async(req,res)=>{
    const data = req.body;
    const { UserName, Password } = data;

    const result = user.get(UserName)
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if (invalid) {

            const token = jwt.sign({ UserName: UserName, Role: result.Role }, secretkey, { expiresIn: "1h" })
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
Route.post('/addBook',authenticate,(req,res)=>{
    try{
        const data=req.body
        const {BookID,BookName,AuthorName,Description,}=data
        if(req.Role == "admin"){
            if(book.has(BookID)){
                res.status(400).json({message:"book is alredy exists"})

            }else{
                book.set(BookID,{BookName,AuthorName,Description})
                res.status(201).json({message:"Book addedd successfully"})
                console.log(book.get(BookID))
                
            }
           
        }else{
            res.status(400).json({message:"unauthorised access"})
        }

    }catch(error){
        res.status(500).json(error);

    }
})
Route.get('/viewUser',authenticate,(req,res)=>{
    try{
    const user=req.Role;
    res.json({user});}
    catch{
        res.status(404).json({message:'user not authorized'});
    }
})
export { Route }