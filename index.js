import express from 'express';
import fs from 'fs';
import {format} from 'date-fns';
import { fileURLToPath } from 'url';
import { log } from 'console';
import path from 'path';
const app=express()
const PORT =4110;
app.get('/',(req,res)=>{
    res.status(200).json({message:"hai every one"})
})
app.get ('/write',(req,res)=>{
    let today=format(new Date(),'dd-MM-yyyy-HH-mm-ss')
    console.log(`Today date is ${today}`)
    const filepath=`TimeStamp/${today}.txt`
    fs.writeFileSync(filepath,`${today}`,'utf8')
    
    let data=fs.readFileSync(filepath,'utf8')
    res.status(200).send(data)
})
const textFile='TimeStamp'
app.get('/retrieve',(req,res)=>{
fs.readdir(textFile,(err,files)=>{
    if(err){
        console.error("Error reading directory",err);
        res.status(500).send("Error reading directory")
        return;
    }
    const showTextFile=files.filter(file=>path.extname(file) === '.txt')
    res.status(200).json(showTextFile)
})
})
app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
})