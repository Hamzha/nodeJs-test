import { isValidObjectId } from "mongoose";
import { User } from "../models/user.modal.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.query;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        ...user._doc,
        password: null,
        accessToken,
      },
      "User logged In Successfully"
    )
  );
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const createdUser = await User.create({
    name,
    username,
    email,
    password,
  });

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "User registered Successfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findOne({ _id: req.user._id });
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old Password");
  }
  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "User Password updated Successfully"));
});

const updateUser = asyncHandler(async (req, res) => {
  const { name, username, email } = req.body;

  const userExisted = await User.countDocuments({
    $and: [{ _id: { $ne: req.user._id } }, { $or: [{ username }, { email }] }],
  });

  if (userExisted === 1) {
    throw new ApiError(400, "Email or Username already existed");
  }

  const user = await User.findOne({ _id: req.user._id }).select("-password");
  user.email = email;
  user.username = username;
  user.name = name;

  await user.save({
    validateBeforeSave: false,
  });
  return res
    .status(201)
    .json(new ApiResponse(200, { user }, "User updated Successfully"));
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (id) {
    const validId = isValidObjectId(id);
    if (!validId) {
      throw new ApiError(400, "Invalid user ID");
    }

    const user = await User.findOne({ _id: id }).select("-password");
    if (!user) {
      throw new ApiError(400, "Invalid user ID");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { user }, "User fetched Successfully"));
  } else {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: req.user }, "User fetched Successfully")
      );
  }
});
export { loginUser, registerUser, updatePassword, updateUser, getUser };
