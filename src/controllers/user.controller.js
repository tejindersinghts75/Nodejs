import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../modles/user1.model.js";
import Product from "../modles/product.js";
import { Api, Send } from "@mui/icons-material";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { addToBlackList } from "../utils/AddBlackList.js";
import ProductImages from "../modles/productimage.js";
import product from "../modles/product.js";


// Create a new ObjectId instance

const blacklist = new Set();

//Register API
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log("email", email);

  if (!firstname || !lastname || !email || !password) {
    // throw new ApiError(404, "All the user field are");
    return res
      .status(404)
      .json(new ApiError(404, [], "All the user fields are requried"));
  }

  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(409).json(new ApiError(409, [], "Account already exist"));
    // throw new ApiError(404, "Account already exist");
    // res.status(404).json({
    //   status:false,
    //   statuscode: 409,
    //   message:"Account is already exist"

    // })
  }

  const user = new User({ firstname, lastname, email, password });
  let result = await user.save();
  if (!result) {
    return res.status(409).json(new ApiError(404, [], "user not created"));
    // throw new ApiError(404, "user not created");
  }
  const token = jwt.sign({ _id: result._id }, process.env.ACCESS_TOKEN_SECRET);
  return res
    .status(201)
    .json(new ApiResponse(200, result, token, "user created Succesfully"));
});

//Login API
const loginUser = asyncHandler(async (req, res) => {
  let { email, password } = req.body;
  //  return res.status(202).json({
  //     email: email,
  //     password:password
  //  })

  console.log(password, email);

  if (!email || !password) {
    return res
      .status(404)
      .json(new ApiError(404, [], "All fields are required"));
  }

  let findUser = await User.findOne({
    email,
  });

  if (!findUser) {
    return res
      .status(404)
      .json(new ApiError(404, [], "User doesn't not exist"));
  }
  const isPasswordValid = await findUser.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json(401, [], "Invalid user credentials");
  }
  const token = jwt.sign(
    { _id: findUser._id, email: findUser.email },
    process.env.ACCESS_TOKEN_SECRET
  );
  return res.status(201).json(new ApiResponse(200, findUser, token));

  return res.status(201).json(new ApiResponse(200, "Logged in Successfully"));
});

//Add Product

const addproducts = asyncHandler(async (req, res) => {
  let {
    title,
    price,
    description,
    deliveryCode,
    productColor,
    productSize,
  } = req.body;

  if (
    !title ||
    !price ||
    !description ||
    !deliveryCode ||
    !productColor ||
    !productSize
  ) {
    return res
      .status(404)
      .json(new ApiError(404, [], "All Fields are required"));
  }
  const imageUrls = req.files.map((file) => {
    return "http://yourdomain.com/" + file.filename; // adjust this to match your domain and path
  });
  //const imageUrls  =  req.file.filename

  try {
    const product = new Product({
      title,
      price,
      description,
      deliveryCode,
      productColor,
      productSize,
      
    });

    const imageUrlsArray = imageUrls.map(async (imageUrl) => {
      const addImage = new ProductImages({
        productImages: imageUrl,
        productId: product._id,
      });
      return await addImage.save();
    });

    // Create a new ProductImages document with the array of image URLs

    // Save the ProductImages document to the database

    const result = await product.save();
    const imageResult = await Promise.all(imageUrlsArray);
    if (!result && !imageResult) {
      return res
        .status(500)
        .json(new ApiError(500, [], "Failed to add product"));
    }
    return res
      .status(201)
      .json(new ApiResponse(201, [], "Product added successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, [], "not added"));
  }
});

//Logout

const logout = asyncHandler(async (req, res) => {
  // Add token to blacklist

  const setinblacklist = await addToBlackList(token);
  console.log(setinblacklist);
  if (setinblacklist) {
    return res.status(200).json({ message: "Logged out successfully" });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const deleteProducts = await ProductImages.deleteOne({ _id: req.params.id });
  res.send(deleteProducts);
});

const getproducts = asyncHandler(async (req, res) => {
  // const showData = await product.find();

  // if (showData.length > 0) {
  //   res.send(showData);
  // } else {
  //   res.send("no product found");
  // }

  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'productimages', // Name of the ProductImage collection
        localField: '_id',
        foreignField: 'productId',
        as: 'productImage'
      }
    }
  ])
   return res.status(200).json(products);;
});

export {
  registerUser,
  loginUser,
  addproducts,
  logout,
  deleteProduct,
  getproducts,
};

// {
//   const product = new Product({title,price,description,deliveryCode,productColor,productSize,productImages})
//   let result = await product.save();
//   if(!result)
//   {
//     return res.status(409).json(new ApiError(409,[],"Product is not added"))
//   }
//   return res.status(201).json(new ApiResponse(201,[],"Success, Product has been added"))
// }
