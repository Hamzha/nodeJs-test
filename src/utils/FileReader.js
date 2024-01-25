import fs from "fs";
import path from "path";

const getFileNames = async ({ directory, extension }) => {
  const files = (await fs.promises.readdir(directory)).filter(
    (files) => path.extname(files) === extension
  );
  return files;
};

const directoryExist = async ({ path }) => {
  const existed = fs.existsSync(path);
  return existed;
};

export { directoryExist, getFileNames };
