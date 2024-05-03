import mongoose ,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new Schema({
    firstname :{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        
    },
    lastname:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required: [true, "password is required"]
    }
})



  //This is for encrypt the password
userSchema.pre("save" , async function(next){
  const user = this;
  if(!user.isModified("password")) return next();
 const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  next()
})

//This is for comparing the password between string and encrypted
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}


// userSchema.methods.generateAccessToken = function(){
//   return jwt.sign(
//       {
//           _id: this._id,
     
//       },
//       process.env.ACCESS_TOKEN_SECRET,
//   )
// }

export default mongoose.model("User", userSchema,'users')