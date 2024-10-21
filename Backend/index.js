import express ,{json}from 'express';
import { Route } from './Routes/AdminRoute.js';



const app= express();
app.use(json())
const port=8000

app.use('/',Route)

app.listen(port,()=>{
    console.log(`Server listening in the port ${port}`);
    
})