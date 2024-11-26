import {json,Router} from 'express'
import mongoose from 'mongoose'
// import { verifyToken } from '../middleware/auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'





const Route =Router();
Route.use(json())
mongoose.connect('mongodb://localhost:27017/Vehicle_mangement')
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    userType: { type: String,required: true },
  
  });
  const User = mongoose.model("User", userSchema)
  const vehicleSchema= new mongoose.Schema({
    serviceno:String,
    vehicleno:{type:String,unique:true},
    vehicletype:String,
    givendate:String,
    estimatedtime:String,
    ownername:String,
    servicedetails:String

})
const Vehicle=mongoose.model("ServiceDetails",vehicleSchema)


Route.post("/register", async (req, res) => {
    try {
      const userDetails = req.body;
      const username = userDetails.username;
      const password = userDetails.password;
      const email = userDetails.email;
      const userType = userDetails.userType
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword, email, userType });
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.log("err", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });
  
 Route.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
  
      console.log(username, password);
      const user = await User.findOne({ username });
      console.log(user, "user");
      if (!user) {
        return res.status(401).json({ error: "authentication failed- user don't exists" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "authentication failed- password don't match" });
      }
  
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },"your-secret-key",{expiresIn: "1h",}
      );
      console.log(token);
      
  
      res.cookie("Authtoken", token);
      res.json({status: true,message: "login success",userType: user.userType});
      return res;
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Login failed" });
    }
  });
  




  Route.post('/addvehicle',async (req,res)=>{
    try{

    const data=req.body
    const{Serviceno,Vehicleno,Vehicletype,Givendate,Estimatedtime,Ownername,Servicedetails}=data
    const Details=await Vehicle.findOne({vehicleno:Vehicleno});
    if(Details){
        res.status(400).json({message:"vehcle alredy exists"})
    }else{
        const newVeh= new Vehicle({
            serviceno:Serviceno,
            vehicleno:Vehicleno,
            vehicletype:Vehicletype,
            givendate:Givendate,
            estimatedtime:Estimatedtime,
            ownername:Ownername,
            servicedetails:Servicedetails


        })
        await newVeh.save();
        res.status(200).json({message:"vehicle added successfully"})
    }
    }catch(error){
        res.status(500).json({message:"server errorr"})

    }

})
Route.get('/viewvehicles',async(req,res)=>{
        const fulllist = await Vehicle.find({})
        if(fulllist.length!=0 ){
            console.log("list of vehicle services added")
            res.send(fulllist)
            console.log(fulllist)
   
        }
        else{
            console.log("no vehicle services added")
            res.send("  no vehicle services added")
        }
})
// Route.get('/search/:type',async (req,res)=>{

    
//   const Vtype=req.params.type
//   try{

//   const result=await Vehicle.find({vehicletype:Vtype})
//   if(result){
//       res.status(200).json(result)
//   }else{
//       res.status(404).json({message:"vehicle not found"})
//   }
// }catch(error){
//   res.status(500).json({message:"server eroor"})
// }

// })

export {Route}