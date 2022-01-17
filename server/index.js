const express = require('express')
const userModel=require('./userschema')
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv')
// const bcrypt=require('bcrypt')
const multer=require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');

dotenv.config()



const app = express()

app.use(express.json())
app.use(cors())
mongoose.connect(process.env.Mongo_url,{useNewUrlParser:true ,useUnifiedTopology: true,});
const storage=multer.diskStorage({
     destination: function(req, file, cb) {
          cb(null, './');
      },
      filename: function(req, file, cb) {   
          cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
      }
})
const upload=multer({storage:storage});  
// respond with "hello world" when a GET request is made to the homepage

 
app.post('/ins',upload.single("photo"), async function (req, res) {
     const name = req.body.name;
     const Password=req.body.Password;
      const photo=req.file.filename;
     // bcrypt.hash(Password, 10, function(err, hash) {
          console.log(req.body)
          // console.log(hash);
          // const pass=hash; 
          const data=new userModel({name:name,Password:Password,photo:photo});
      
     //     })
       try{
             data.save();
            res.send("inserted data");
       }catch(err){
            console.log(err);
       };});
    
           // Store hash in your password DB.
     
 


app.get('/read',async(req,res)=>{
     userModel.find({},(err,result)=>{
          
     if(err){

          res.send(err)
     }
     res.send(result);
})

})
app.put('/update',async(req,res)=>{
     const upname = req.body.name;
     const id=req.body.id;
     console.log(upname);
     userModel.findByIdAndUpdate(id,{name:upname},(err,result)=>{
        
         
        
     if(err){
         
          res.send(err);
          console.log(err);
     }

     res.send(result);
     
})

})

app.listen(3001,()=>{
     console.log("running");

})