import { getCounters, getCounter } from "../private/stats";
import { checkPwd } from "./login.js";

export const getAllStats = (pwd) => {
  if (!checkPwd(pwd)) return;
  let obj = {};
  for (let name of getCounters()) obj[name] = getCounter(name);
  return obj;
};
