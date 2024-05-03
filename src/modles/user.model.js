
import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { NextPlan } from "@mui/icons-material";

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        index:true
    },
    
    lastname:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        index:true
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

    // avatar:{
    //     type:String, 
    //     required: true
    // },
    // coverImage:{
    //     type: String
    // },
    // watchHistory:[
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: "Video"
    //     }
    // ],
    
    // refreshToken:{
    //     type:String
    // }

},{timestamps:true})

//This is for encrypt the password
userSchema.pre("save" , async function(next){

    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})
//This is for comparing the password between string and encrypted
userSchema.methods.isPasswordCorrect =  async function(password)
{
   return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            // email: this.email,
            // username: this.username,
            // fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        // {
        //     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        // }

    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id,
            // email: this.email,
            // username: this.username,
            // fullname : this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        // {
        //     expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        // }

    )
}


export default mongoose.model("User", userSchema)