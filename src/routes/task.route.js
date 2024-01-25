import { Router } from "express";
import {
  downloadFiles,
  hitURL,
  readFile,
} from "../controllers/task.controller.js";
import { validate } from "../utils/func.js";
import {
  downloadFilesValidator,
  fileReadValidator,
} from "../validators/task.validator.js";

const router = Router();

router.route("/read-file").get(validate(fileReadValidator), readFile);
router
  .route("/download-files")
  .get(validate(downloadFilesValidator), downloadFiles);
router.route("/hit-url").get(hitURL);
export default router;
