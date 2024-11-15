import express,{json} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { adminRouters } from './Router/authRouter.js';

dotenv.config();
const app= express();

app.use(json());
app.use(cors({
    credentials:true,
    origin:"http://127.0.0.1:5500"
}));
app.use('/',adminRouters)
const PORT = process.env.port

app.listen(PORT,()=>{
    console.log("server running on PORT",PORT);
    
})
