
import mongoose ,{Schema} from "mongoose";


const productImageSchema = new Schema({
    productImages:{
        type:String,
        requried:true
    },
    productId:
    {
        type: Schema.Types.ObjectId, 
        ref: "Product"
    }

},{timestamps:true})



export default mongoose.model("ProductImages", productImageSchema)