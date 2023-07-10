import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
   email:{
      type: String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
},{
   toJSON:{
      transform(doc,ret){
         delete ret.password;
         delete ret.salt;
         delete ret.__v
      }
   },
   timestamps:true
});

const User= mongoose.model('User',userSchema);

export {User};