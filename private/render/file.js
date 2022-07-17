import fs from "fs/promises";

const filePerms = {};

export const server = async (document, options) => {
  deleteOldFilePerms();
  options.res.send(await fs.readFile(filePerms[options.req.query.perm].file));
};

export const registerFilePerm = (file) => {
  const id = Math.floor(Math.random() * 999999);
  filePerms[id] = { file, time: Date.now() + 1200000 };
  return id;
};

const deleteOldFilePerms = () => {
  for (let id of Object.keys(filePerms)) {
    if (filePerms[id].time < Date.now()) delete filePerms[id];
  }
};
