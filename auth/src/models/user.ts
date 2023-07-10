import mongoose from "mongoose";

//interface that takes care of defining my user attributes
interface UserAttrs{ 
   email: string,
   password: string
}

//Interface that takes care of adding a build function to mu user model
interface UserModel extends mongoose.Model<UserDoc>{
   build:(attrs:UserAttrs)=>UserDoc
}

//Interface that takes care of describing the properties that a user Doc has
interface UserDoc{
   save(): unknown;
   email:string,
   password:string,
}
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

userSchema.statics.build=(attrs:UserAttrs)=>{
   return new User(attrs);
}


const User= mongoose.model<UserDoc, UserModel>('User',userSchema);

export {
   User,
};