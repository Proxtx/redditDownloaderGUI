import config from "@proxtx/config";
import { registerFilePerm } from "../private/render/file.js";

export const loadFile = async (pwd, file) => {
  if (pwd != config.pwd) return { success: false };
  return { success: true, perm: registerFilePerm(file) };
};
