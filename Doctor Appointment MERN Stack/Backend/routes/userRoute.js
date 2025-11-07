import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
} from "../controllers/userController";
import { authUser } from "../middleware/authUser";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.get(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
export default userRouter;
