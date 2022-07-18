import { extHandler } from "../lib/lib.js";
import { generate } from "../lib/elementGenerator.js";

let postWrap = document.getElementById("previewPost");
let elem = generate({
  type: extHandler(framework.data.post.files[0]).ext,
  src: "/file.route/?perm=" + framework.data.perm,
  text: framework.data.post.title + "\n" + framework.data.post.subreddit,
  click: async () => {
    await new Promise((r) => setTimeout(r, 500));
    location.pathname = "/post";
  },
});
postWrap.appendChild(elem);

localStorage.post = JSON.stringify(framework.data.post);
