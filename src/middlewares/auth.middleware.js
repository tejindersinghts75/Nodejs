import jwt  from "jsonwebtoken"
import { isBlackListed } from "../utils/AddBlackList.js";
import { ApiError } from "../utils/ApiError.js";

const verifyToken =(req,res,next)=>
{
    const token = req.headers.authorization.replace("Bearer ","")
    
    if (!token) {
        return res.status(403).json(new ApiError(403, []," invalid token"));
      }
    
     if(isBlackListed(token))
     {
      return res.status(500).json(new ApiError(500, [], "Invalid token")); 
     }
     
      // Token is not blacklisted, proceed to next middleware
    const isVerifyUser = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (error,decode)=>{
      console.log("decode", decode)
      return decode
    })
    console.log(isVerifyUser)
    if(req.usertoken=isVerifyUser)
    {
      console.log("user is verify")
      next()
    }
    else{
      console.log("not verified")
    }

    
}
export default verifyToken