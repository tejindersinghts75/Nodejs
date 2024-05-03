import { Router } from "express";
import { registerUser,loginUser,addproducts,logout, deleteProduct } from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import verifyToken from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
        name:"coverImage",
        maxCount:1
    }
  ]),
  registerUser
);

router.route('/login').post(loginUser)
router.route('/addproducts').post(upload.array("productImages",50),addproducts)
router.route('/logout').post(verifyToken,logout)
router.route('/delete:id').delete(deleteProduct)


export default router;
