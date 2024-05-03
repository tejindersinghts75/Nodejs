import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type :"auto"
        })
        console.log("file is uploaded on cloudinary")
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)
    }
}
