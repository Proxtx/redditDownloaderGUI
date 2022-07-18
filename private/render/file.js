import fs from "fs/promises";
import { increaseCounter, setCounter } from "../stats.js";

const filePerms = {};

export const server = async (document, options) => {
  deleteOldFilePerms();
  setCounter("active image perms", Object.keys(filePerms).length);
  if (!filePerms[options.req.query.perm])
    return increaseCounter("failed image accesses");
  increaseCounter("image accesses");
  options.res.send(await fs.readFile(filePerms[options.req.query.perm].file));
};

export const registerFilePerm = (file) => {
  const id = Math.floor(Math.random() * 999999);
  filePerms[id] = { file, time: Date.now() + 1200000 };
  increaseCounter("image perms all time");
  return id;
};

const deleteOldFilePerms = () => {
  for (let id of Object.keys(filePerms)) {
    if (filePerms[id].time < Date.now()) delete filePerms[id];
  }
};
