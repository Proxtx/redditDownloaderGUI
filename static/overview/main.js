import { initGUI } from "../lib/guiComposer.js";

let optionsWrap = document.getElementById("optionsWrap");
let postsWrap = document.getElementById("contentWrapper");

initGUI(
  postsWrap,
  optionsWrap,
  "communities",
  [true, ""],
  async (post, fileServer, extHandler) => {
    let extHandlerResult = extHandler(post.previewPost.files[0]);
    let download = await fileServer.loadFile(
      cookie.pwd,
      post.previewPost.files[0]
    );
    return {
      text: post.subreddit,
      data: extHandlerResult.prefix + download.data,
      textSize: "normal",
      type: extHandlerResult.ext,
    };
  }
);
