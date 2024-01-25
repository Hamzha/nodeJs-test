import { check } from "express-validator";

export const registerValidator = [
  check("email")
    .exists()
    .withMessage("Email missing")
    .isEmail()
    .withMessage("Invalid Email Address"),
  check("name")
    .exists()
    .withMessage("Name missing")
    .isLength({ min: 6 })
    .withMessage("Name length must be greater than 5"),
  check("username")
    .exists()
    .withMessage("Username missing")
    .isLength({ min: 6 })
    .withMessage("Username length must be greater than 5"),
  check("password")
    .exists()
    .withMessage("Password missing")
    .isLength({ min: 6 })
    .withMessage("Password length must be greater than 5"),
];

export const loginValidator = [
  check("email")
    .exists()
    .withMessage("Email missing")
    .isEmail()
    .withMessage("Invalid Email Address"),
  check("password").exists().withMessage("Password missing"),
];

export const passwordValidator = [
  check("newPassword")
    .exists()
    .withMessage("New Password missing")
    .isLength({ min: 6 })
    .withMessage("New Password length must be greater than 5"),
  check("oldPassword")
    .exists()
    .withMessage("Old Password missing")
    .isLength({ min: 6 })
    .withMessage("Old Password length must be greater than 5"),
];

export const updateUserValidator = [
  check("email")
    .exists()
    .withMessage("Email missing")
    .isEmail()
    .withMessage("Invalid Email Address"),
  check("name")
    .exists()
    .withMessage("Name missing")
    .isLength({ min: 6 })
    .withMessage("Name length must be greater than 5"),
  check("username")
    .exists()
    .withMessage("Username missing")
    .isLength({ min: 6 })
    .withMessage("Username length must be greater than 5"),
];
