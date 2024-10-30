import express ,{json}from 'express';
import { Route } from './Routes/AdminRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';



dotenv.config();
const app= express();
app.use(cors({
    origin:'http://127.0.0.1:5501',
    credentials:true
    //origin:'http://127.0.0.1:5000'
}))
app.use(json())
const port=process.env.port;
app.use(cookieParser());

app.use('/',Route)

app.listen(port,()=>{
    console.log(`Server listening in the port ${port}`);
    
})