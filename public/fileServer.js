import fs from "fs/promises";
import config from "@proxtx/config";

export const loadFile = async (pwd, file) => {
  if (pwd != config.pwd) return { success: false };
  return { success: true, data: (await fs.readFile(file)).toString("base64") };
};
