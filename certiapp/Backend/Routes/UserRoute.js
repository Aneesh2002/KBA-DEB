import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { authenticate } from "../middleware/authentication.js";

dotenv.config();
const Route = Router();
const user=new Map();

Route.use(json())
const secretkey =process.env.SecretKey



Route.post('/signup',async(req,res)=>{
    console.log("hii")

    try {
        const data = req.body;
    const {FirstName,LastName,UserName,Password,Role}=data
    const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)

        if (user.has(UserName)) {
            res.status(400).json({ message: "User already exits" })
        } else {
            user.set(UserName, {
                FirstName, LastName, Password: newPass,Role
            })
        }

        console.log(user.get(UserName))
        res.status(201).json({ Message: "Data Saved" })

    }
    catch(error){
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
Route.post('/issue',authenticate,(req,res)=>{
    try{
        const data=req.body
        const {CourseID,
    CourseName,
    CandidateName,
    Grade,
    IssueDate}=data
        if(req.Role == "admin"){
            if(user.has(CourseID)){
                res.status(400).json({message:"certificate alredy exists"})

            }else{
                user.set(CourseID,{CourseName,CandidateName,Grade,IssueDate})
                res.status(201).json({message:"Certificate addedd successfully"})
                console.log(user.get(CourseID))
                
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
Route.get('/getCertificate/:CourseID',(req,res)=>{
            try{
                const search =req.params.CourseID
           console.log(search);
        
                if (user.has(search)) {
                    console.log(user.get(search));
                    const items =user.get(search)
                    return res.status(200).json({
                        message:search,
                        course:items
                    })
        
                }
                else {
                    res.status(404).json({ message: "No course found,Check the name" })
                }
            }
            catch (error) {
                res.status(400).json({ message: "Check the input" })
            }
         })


export {Route}