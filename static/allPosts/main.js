import { initGUI } from "../lib/guiComposer.js";

let optionsWrap = document.getElementById("optionsWrap");
let postsWrap = document.getElementById("contentWrapper");

initGUI(
  postsWrap,
  optionsWrap,
  "posts",
  [true, ""],
  async (post, fileServer, extHandler) => {
    let extHandlerResult = extHandler(post.files[0]);
    let download = await fileServer.loadFile(cookie.pwd, post.files[0]);
    return {
      text: post.title,
      data: extHandlerResult.prefix + download.data,
      textSize: "none",
      type: extHandlerResult.ext,
      click: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        cookie.post = JSON.stringify(post);
        window.location.pathname = "/post/";
      },
    };
  }
);
