import jwt from "jsonwebtoken"

const blacklist = new Set();

const addToBlackList =async (token)=>
{
   return blacklist.add(token);
}

const isBlackListed =(token)=>{
    return blacklist.has(token)
}

export {addToBlackList,isBlackListed};