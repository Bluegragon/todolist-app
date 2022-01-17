const mongoose= require('mongoose')
const userschema=mongoose.Schema({
     name:{
          type: String,
          required:true,
     }
    , Password:{
          type: String,
          required:true,
     }
     , photo:{
          type:String,
     }
     
});
const user=mongoose.model("User",userschema);
// creates schema in database
module.exports=user;