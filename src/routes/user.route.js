import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyLogin } from "../middlewares/auth.middleware.js";
import {
  loginValidator,
  passwordValidator,
  registerValidator,
  updateUserValidator,
} from "../validators/user.validator.js";
import { validate } from "../utils/func.js";

const router = Router();

router.route("/login").post(validate(loginValidator), loginUser);
router.route("/register").post(validate(registerValidator), registerUser);
router
  .route("/update-password")
  .put(verifyLogin, validate(passwordValidator), updatePassword);
router
  .route("/update-user")
  .put(verifyLogin, validate(updateUserValidator), updateUser);
router.route("/").get(verifyLogin, getUser);

export default router;
