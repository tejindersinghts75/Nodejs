
import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { NextPlan } from "@mui/icons-material";

const productImageSchema = new Schema({
    productImages:{
        type:String,
        requried:true
    },
    productId:
    {
        type:String,
        required:true
    }

},{timestamps:true})



export default mongoose.model("ProductImages", productImageSchema)