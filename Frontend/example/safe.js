import { Router, json } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import { authenticate } from "../Middileware/author.js";
import dotenv from 'dotenv'

dotenv.config()
const Route = Router();

const user = new Map();
const course = new Map();
const seceretKey = process.env.SecretKey;

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
                FirstName, LastName, Password: newPass, Role
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
        if (invalid) {

            const token = jwt.sign({ UserName: UserName, Role: result.Role }, seceretKey, { expiresIn: "1h" })
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
Route.post('/addcourse', authenticate, (req, res) => {
    try {
        if (req.UserName) {


            console.log('Hello')
            console.log(req.UserName);
            console.log(req.Role);

            const { coursename, courseID, description, coursetype } = req.body
            console.log(coursename);

            if (req.Role == "admin") {
                if (course.has(coursename)) {
                    res.status(400).json({ message: "Course already exsist" })
                }

                else {
                    course.set(coursename, { courseID, description, coursetype })
                    res.status(200).json({ message: 'Course Add Successfully' })
                    console.log(course.get(coursename))
                }


            }
            else {
                res.status(400).json({ message: 'User Is Not Admin' })
                console.log("User Is Not Admin")

            }
        } else {
            console.log("Invalid User");
        }
    }
        catch(error){
            res.status(400).json(error)

        }
    })
Route.post('/updatecourse', (req, res) => {
    console.log("hello")
    try {
        const update = req.body;
        const { courseID, Newcoursename, Newcoursetype, Newdescription } = update;
        console.log(courseID, Newcoursename, Newcoursetype, Newdescription);

        if (course.has(Newcoursename)) {
            const item = course.get(Newcoursename);
            console.log(item);

            item.coursename = Newcoursename || item.coursename;
            item.coursetype = Newcoursetype || item.coursetype;
            item.description = Newdescription || item.description
            course.set(courseID, item);
            console.log(course)

        } else {
            console.log(`Item with ID ${courseID} not founded`)
        }



    }
    catch (error) {
        res.status(500).json(error);
    }
})
Route.post('/search', authenticate, (req, res) => {
    try {

        if (req.UserName) {
            const body = req.body;
            const search = body.search;

            if (search) {
                const result = [];
                for (const [id, item] of course) {
                    if (id.includes(search) || item.coursename.includes(search) || item.courseID.includes(search) || item.coursetype.includes(search)) {
                        result.push(id, item.coursename, item.courseID, item.coursetype, item.description);
                        console.log(result);
                        res.status(200).json({ message: "data availabe :", result })
                        break;
                    }
                }

            } else {
                console.log('dont find any earch element')
            }

        } else {
            console.log("not a valid user")
        }

    } catch (err) {
        console.log(err)
    }

})


Route.get('/search/:name', authenticate, (req, res) => {
    console.log("hello")

    try {

        if (req.UserName=="admin") {

            const search = req.params.name
            course.get(search)

            if (search) {
                const result = [];
                for (const [id, item] of course) {
                    if (id.includes(search) || item.coursename.includes(search) || item.courseID.includes(search) || item.coursetype.includes(search)) {
                        result.push(id, item.coursename, item.courseID, item.coursetype, item.description);
                        console.log(result);
                        res.status(200).json({ message: "data availabe :", result })
                        break;
                    }
                }

            } else {
                console.log('dont find any earch element')
            }

        } else {
            console.log("not a valid user")
        }

    } catch (err) {
        console.log(err)
    }




})
Route.get('/search', (req, res) => {
    console.log(req.query.Aneesh);
    try {

        if (req.UserName) {

            const search = req.query.Aneesh
            course.get(search)

            if (search) {
                const result = [];
                for (const [id, item] of course) {
                    if (id.includes(search) || item.coursename.includes(search) || item.courseID.includes(search) || item.coursetype.includes(search)) {
                        result.push(id, item.coursename, item.courseID, item.coursetype, item.description);
                        console.log(result);
                        res.status(200).json({ message: "data availabe :", result })
                        break;
                    }
                }

            } else {
                console.log('dont find any earch element')
            }

        } else {
            console.log("not a valid user")
        }

    } catch (err) {
        console.log(err)
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
Route.get('/viewCourse', async(req,res)=>{
    try{
        console.log(course.size);

        if(course.size!=0){
           
            
        res.send(Array.from(course.entries()))
    }
else{
    res.status(404).json({message:'Not Found'});
}}
    catch{
        res.status(404).json({message:"Internal error"})
    }
})
Route.get('/getcourse/:coursename',(req,res)=>{
    try{
        const search =req.params.coursename
   console.log(search);
  
        if (course.has(search)) {
            console.log(course.get(search));
            const items =course.get(search)
            return res.status(200).json({
                message:`${search}`,
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
 Route.delete('/delete/:coursename',authenticate ,(req,res)=>{
    try {

        const name = req.params.coursename

        if (req.UserRole === 'admin') {
            if (course.has(name)) {
                course.delete(name);
                res.status(200).json({ message: "course deleted" })
                console.log(course)
            } else {
                console.log('This id is not existed!');

            }
        }

    } catch (error) {
        console.log(error)
    }
})
Route.get('/getCourse',(req,res)=>{
    try{
   const search= req.query.coursename; 
   console.log(search);
        const result = course.get(search)
        if (result) {

            res.send(result);
        }
        else {
            res.status(404).json({ message: "No course found,Check the name" })
        }
    }
    catch (error) {
        res.status(400).json({ message: "Check the input" })
    }
 })










export { Route,course };