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
    let loadId = await fileServer.loadFile(
      cookie.pwd,
      post.previewPost.files[0]
    );
    return {
      text: post.subreddit,
      src: "/file.route/?perm=" + loadId.perm,
      textSize: "normal",
      type: extHandlerResult.ext,
      click: async () => {
        await new Promise((r) => setTimeout(r, 1000));
        cookie.subreddit = post.subreddit;
        window.location.pathname = "/subreddit/";
      },
    };
  }
);
