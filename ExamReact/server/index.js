import express,{json} from 'express'
import {Route} from './routes/Router.js'
import cors from 'cors'
import cookieParser from 'cookie-parser';



const app = express();
app.use(
    cors({ 
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());
app.use(express.json());
const port= 6000;
app.use(json());
app.use('/',Route)
app.listen(port, () => {
    console.log("server is running in ",  port)
})