
import express,{json} from 'express'
import { Route } from './Routes/UserRoute.js';
import dotenv from 'dotenv'


dotenv.config();
const certiapp = express();
certiapp.use(json())
const port = process.env.port

certiapp.use('/',Route)

certiapp.listen(port,()=>{
    console.log(`Server listening in the port ${port}`)
})