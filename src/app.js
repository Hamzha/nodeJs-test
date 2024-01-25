import cookieParser from "cookie-parser";
import express from "express";
import userRouter from "./routes/user.route.js";
import taskRouter from "./routes/task.route.js";

import { ApiError } from "./utils/ApiError.js";
import { asyncHandler } from "./utils/asyncHandler.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/tasks", taskRouter);

app.all(
  "*",
  asyncHandler((req) => {
    throw new ApiError(404, `Can't find ${req.originalUrl} on the server!`);
  })
);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log({ err });
  return res.status(400).json(err);
});
export { app };
