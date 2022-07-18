import { getCounter, getCounters } from "../stats.js";
import { index } from "../indexClassHolder.js";
import { registerFilePerm } from "./file.js";
import { randomArrayIndex } from "../indexer/index.js";
import config from "@proxtx/config";

export const server = (document, options) => {
  if (options.req.cookies.pwd != config.pwd) return;
  let counters = getCounters();
  let statsHolder = document.getElementById("statsHolder");
  for (let counterName of counters) {
    statsHolder.appendChild(createStat(document, counterName));
  }

  let post = randomArrayIndex(index.indexFile.index);
  options.data.post = post;
  options.data.perm = registerFilePerm(post.files[0]);
};

const createStat = (document, name) => {
  let value = getCounter(name);
  let div = document.createElement("div");
  div.setAttribute("class", "stat");
  let nameElem = document.createElement("m-text");
  nameElem.innerText = name;
  let valueElem = document.createElement("m-text");
  valueElem.innerText = value;
  div.appendChild(nameElem);
  div.appendChild(valueElem);

  return div;
};
