import express,{json} from 'express'
import { Route } from './Routers/Route.js'

const app=express();

app.use('/',Route);
app.use(json());

const port=5000;
app.listen(port,()=>{
    console.log(`port listening to ${port}`);
    
})