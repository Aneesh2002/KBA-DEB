import { Router, json } from "express";
import { course } from "./AdminRoute.js";
// import bcrypt from 'bcrypt';
// import jwt from "jsonwebtoken"
// import { authenticate } from "../Middileware/author.js";
import dotenv from 'dotenv'

dotenv.config()
const UserRoute = Router()
