import express,{json} from 'express';
import bcrypt from 'bcrypt';

const app=express();
app.use(json())
const port=8000;

const user = new Map()

app.get('/',(req,res)=>{   //req-request ,res-response
    res.send("Hello World")

})

app.post('/signup',async(req,res)=>{
    console.log("hi")
    
    const data=(req.body);
    console.log(data.firstname)
    const {firstname,lastname,username,password,Role}=data
    console.log(firstname);
    const newPassword=await bcrypt.hash(password,10)
    user.set(username,{firstname,lastname,password:newPassword,Role});
    
    
    
    console.log(newPassword);
    console.log(user.get(username));
    // res.status(201).send("Data saved")
    res.status(201).json({message:"Data saved"})
    
    
    
})

app.listen(port,()=>{
    console.log(`server is listening to ${port}`)
})