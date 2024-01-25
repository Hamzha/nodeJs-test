import download from "download";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { directoryExist, getFileNames } from "../utils/FileReader.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const readFile = asyncHandler(async (req, res) => {
  try {
    const { path, extension } = req.body;

    const existed = await directoryExist({ path });
    if (!existed) {
      throw new ApiError(400, "Path not found");
    }
    const files = await getFileNames({
      directory: path,
      extension: extension,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, { files }, "Files read Successfully"));
  } catch (e) {
    throw new ApiError(
      e.statusCode || 500,
      e.message || "Internal Server Error"
    );
  }
});
const downloadFiles = asyncHandler(async (req, res) => {
  const { links } = req.body;

  const responses = await Promise.allSettled(
    links.map((url) => download(url, "src/media"))
  );

  const response = responses.map((response, index) => {
    return { link: links[index], status: response.status };
  });

  return res
    .status(200)
    .json(new ApiResponse(200, { ...response }, "Files read Successfully"));
});
const hitURL = asyncHandler(async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const data = await response.json();
  if (response.status >= 200 && response.status <= 299)
    return res
      .status(200)
      .json(new ApiResponse(200, { ...data }, "Successful"));
  throw new ApiError(response.status, "Something went wrong.");
});
export { downloadFiles, hitURL, readFile };
