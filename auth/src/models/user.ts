import mongoose from "mongoose";
import { Password } from "../services/password";

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
   id:string
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
         ret.id=ret._id;
         delete ret._id;
         delete ret.password;
         delete ret.__v;
      }
   },
   timestamps:true
});

//hashing pass before saving it:
userSchema.pre('save',async function(next){
   if(this.isModified('password')){
      const hashed=await Password.toHash(this.get('password'));
      this.set('password',hashed);
   }

   next();
})

//build function to add users to collecction
userSchema.statics.build=(attrs:UserAttrs)=>{
   return new User(attrs);
}


const User= mongoose.model<UserDoc, UserModel>('User',userSchema);

export {
   User,
};