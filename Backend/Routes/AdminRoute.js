import { Router,json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../Middileware/author.js";
const Route = Router();

const user = new Map();
const course = new Map()
const seceretKey = "hello";

Route.use(json())

Route.post('/signup', async (req, res) => {
    try {                                   //error handling using try catch method
        console.log("Hi")
        const data = req.body;
        console.log(data.FirstName)
        const { FirstName,
            LastName,
            UserName,
            Password,
            Role } = data;
        console.log(FirstName)

        const newPass = await (bcrypt.hash(Password, 10));
        console.log(newPass)

        if (user.has(UserName)) {
            res.status(400).json({ message: "User already exits" })
        } else {
            user.set(UserName, {
                FirstName,LastName, Password: newPass, Role
            })
        }

        console.log(user.get(UserName))
        res.status(201).json({ Message: "Data Saved" })
    }
    catch (error) {
        res.status(500).json(error);
    }


})

Route.post('/login', async (req, res) => {
    const data = req.body;
    const { UserName, Password } = data;

    const result = user.get(UserName)
    console.log(result);

    if (result) {
        console.log(Password)
        const invalid = await bcrypt.compare(Password, result.Password);
        console.log(invalid);
        if (invalid){
           
            const token=jwt.sign({UserName:UserName,Role:result.Role}, seceretKey,{expiresIn:"1h"})
            console.log(token)
            res.cookie('authToken',token,{
                httpOnly:true
            });
            res.status(200).json({message:"Success"})
        }
        else{
              res.status(403).json({ Message: "Password Is Correct" })   
        }
        
    }
    else {
        res.status(403).json({ message: "User is not exisit" })
    } 

    
        
    })
Route.post('/addcourse',authenticate,(req,res)=>{
    try{
        console.log(req.Role)
        console.log(req.UserName);
        const Details =req.body;
        const {coursename,courseID,coursetype,description}=Details
        console.log(coursename)
        
            if(req.Role == "admin"){
                if(course.has(coursename)){
                    console.log("course is already existed")
                }else{
                    course.set(coursename,{courseID,coursetype,description})
                res.status(200).json({message:"successfully added course"})
                console.log(course.get(coursename))

                }
                
            }
            else{            item.quantity = newQuantity !== undefined ?newQuantity:item.quantity;

                res.status(400).json({message:"user cant add courses"})
                console.log("user cant add course")
                
                

            }

        }

    
    catch(error){
        res.status(500).json(error);


    }
        
    })
Route.post('/updatecourse',(req,res)=>{
    console.log("hello")
    try{
        const update=req.body;
        const {courseID,Newcoursename,Newcoursetype,Newdescription}=update;
        if(course.has(courseID)){
            console.log(Newcoursename)
            const item = course.get(courseID);
            item.coursename = Newcoursename || item.coursename;
            item.coursetype = Newcoursetype ||item.coursetype;
            item.description = Newdescription || item.description
            course.set(courseID,item);
            console.log(`item with ID ${courseID} updated`)
            console.log(course.get(courseID))

        }else{
            console.log(`Item with ID ${courseID} not founded`)
        }



    }
    catch(error){
        res.status(500).json(error);
    }
})




export { Route };