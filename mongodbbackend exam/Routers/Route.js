import express,{json, Router} from 'express'
import mongoose from 'mongoose';

const Route=Router()
Route.use(json());

const vehicleSchema= new mongoose.Schema({
    serviceno:String,
    vehicleno:{type:String,unique:true},
    vehicletype:String,
    givendate:String,
    estimatedtime:String,
    ownername:String,
    servicedetails:String

})
const Vehicle=mongoose.model("ServiceDetails",vehicleSchema)
mongoose.connect('mongodb://localhost:27017/Vehicle_mangement')

Route.post('/addvehicle',async (req,res)=>{
    try{

    const data=req.body
    const{Serviceno,Vehicleno,Vehicletype,Givendate,Estimatedtime,Ownername,Servicedetails}=data
    const Details=await Vehicle.findOne({vehicleno:Vehicleno});
    if(Details){
        res.status(400).json({message:"vehcle alredy exists"})
    }else{
        const newVeh= new Vehicle({
            serviceno:Serviceno,
            vehicleno:Vehicleno,
            vehicletype:Vehicletype,
            givendate:Givendate,
            estimatedtime:Estimatedtime,
            ownername:Ownername,
            servicedetails:Servicedetails


        })
        await newVeh.save();
        res.status(200).json({message:"vehicle added successfully"})
    }
    }catch(error){
        res.status(500).json({message:"server errorr"})

    }

})
Route.get('/view/:no',async (req,res)=>{

    
    const Vno=req.params.no
    try{

    const result=await Vehicle.findOne({vehicleno:Vno})
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({message:"vehicle not found"})
    }
}catch(error){
    res.status(500).json({message:"server eroor"})
}

})
Route.delete('/delete/:no',async (req,res)=>{

    
    const Vno=req.params.no
    try{

    const result=await Vehicle.findOneAndDelete({vehicleno:Vno})
    if(result){
        res.status(200).json({message:"delete success"})
    }else{
        res.status(404).json({message:"vehicle not found"})
    }
}catch(error){
    res.status(500).json({message:"server eroor"})
}

})
Route.put('/update',async (req,res)=>{
    const data=req.body;
    const{Vehicleno,newServicedetails}=data

    try{
        const result=await Vehicle.findOne({vehicleno:Vehicleno})
        if(result){
            result.servicedetails=newServicedetails || result.servicedetails
            await result.save()
            res.status(200).json({message:"updated success"})
        }else{
            res.status(404).json({message:"vehicle not found"})
        }


    }catch(error){
        res.status(500).json({message:"server error"})
    }

})
Route.get('/search/:type',async (req,res)=>{

    
    const Vtype=req.params.type
    try{

    const result=await Vehicle.find({vehicletype:Vtype})
    if(result){
        res.status(200).json(result)
    }else{
        res.status(404).json({message:"vehicle not found"})
    }
}catch(error){
    res.status(500).json({message:"server eroor"})
}

})





export {Route}
