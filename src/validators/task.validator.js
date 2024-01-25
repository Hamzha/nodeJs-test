import { check } from "express-validator";

export const fileReadValidator = [
  check("path").exists().withMessage("Path missing"),
  check("extension").exists().withMessage("Extension missing"),
];

export const downloadFilesValidator = [
  check("links")
    .exists()
    .withMessage("Links missing")
    .isArray()
    .withMessage("Expecting a array of links"),
];
