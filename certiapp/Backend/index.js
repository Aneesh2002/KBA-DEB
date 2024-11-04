
import express,{json} from 'express'
import { Route } from './Routes/UserRoute.js';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';


dotenv.config();
const certiapp = express();
certiapp.use(cors({
    origin:'http://127.0.0.1:5501',
    credentials:true
    //origin:'http://127.0.0.1:5000'
}))
certiapp.use(json())
const port = process.env.port

certiapp.use(cookieParser());

certiapp.use('/',Route)

certiapp.listen(port,()=>{
    console.log(`Server listening in the port ${port}`)
})