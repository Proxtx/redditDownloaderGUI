import { fileServer } from "../lib/apiLoader.js";
import { extHandler } from "../lib/lib.js";
import { generateDataDisplay } from "../lib/elementGenerator.js";

const post = JSON.parse(localStorage.post);
const info = document.getElementById("info");
const content = document.getElementById("content");

post.date = new Date(post.date).toISOString();

const displayObject = (object) => {
  let obj = document.createElement("div");
  obj.setAttribute("class", "dataWrap");
  if (typeof object != "object" || object == undefined || object == null) {
    let v = document.createElement("a");
    v.innerText = object;
    return v;
  }
  if (Array.isArray(object)) {
    for (let i in object) {
      obj.appendChild(createAttribute(i, displayObject(object[i])));
    }
    return obj;
  }
  for (let i of Object.keys(object)) {
    let valueElem = document.createElement("a");
    valueElem.innerText = object[i];
    obj.appendChild(
      createAttribute(
        i,
        typeof object[i] == "object" && object[i]
          ? displayObject(object[i])
          : valueElem
      )
    );
  }

  return obj;
};

const createAttribute = (attribute, value) => {
  let wrap = document.createElement("div");
  let attributeElem = document.createElement("m-text");
  attributeElem.innerText = attribute + ": ";
  value.setAttribute("class", "dataValue");
  attributeElem.setAttribute("class", "dataAttribute");

  wrap.appendChild(attributeElem);
  wrap.appendChild(value);
  wrap.setAttribute("class", "attribute");
  return wrap;
};

info.appendChild(displayObject(post));

const generateImages = async () => {
  for (let file of post.files) {
    let loadId = await fileServer.loadFile(cookie.pwd, file);
    let extHandlerResult = extHandler(file);
    let dataDisplay = generateDataDisplay({
      type: extHandlerResult.ext,
      src: "/file.route/?perm=" + loadId.perm,
    });

    content.appendChild(dataDisplay);
  }
};

await generateImages();
