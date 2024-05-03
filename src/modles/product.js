import mongoose,{Schema} from "mongoose";

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
        lowercase:true,
        trim : true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true,
        trim:true,
    },
    deliveryCode:{
        type:Number,
        required:true,
        trim:true
    },
    productColor:{
        type:String,
        required:true,
        trim:true
    },
    productSize:{
        type:String,
        required:true,
        trim:true
    }


})


export default mongoose.model ("Product", productSchema,'Products')