import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
console.log(process.env.MONGODB_URI)
console.log(DB_NAME)
const connectDB = async()=>{
    try {
        const connectionUrl = `${process.env.MONGODB_URI}/${DB_NAME}`;
        console.log(connectionUrl)
       const connectionInstance =  await mongoose.connect(connectionUrl)
       console.log(`\n MongoDB connected ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}
export default connectDB
