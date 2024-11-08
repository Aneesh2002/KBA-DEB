import express,{json} from 'express'
import { Route } from './Routes/adminRoutes.js';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const library = express();
library.use(cors({
    origin:'http://127.0.0.1:5500',
    credentials:true
    //origin:'http://127.0.0.1:5000'
}))
library.use(json())
const port = process.env.port

library.use(cookieParser());

library.use('/',Route)

library.listen(port,()=>{
    console.log(`Server listening in the port ${port}`)
})