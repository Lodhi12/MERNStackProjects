import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getProfile,
  listAppointment,
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
userRouter.get("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

export default userRouter;
