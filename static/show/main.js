import { overviewManager, fileServer } from "../lib/apiLoader.js";
import { generate } from "../lib/elementGenerator.js";
import { extHandler } from "../lib/lib.js";

let randomPostPosition = 0;

const getRandomPost = async (start) => {
  return (
    await overviewManager.loadOverview(
      cookie.pwd,
      "posts",
      [true, ""],
      ["random", false, ""],
      start,
      start + 1
    )
  ).result[0];
};

const showPost = async () => {
  let post = await getRandomPost(randomPostPosition);
  randomPostPosition++;

  let postWrap = document.getElementById("post");
  postWrap.innerHTML = "";
  let elem = generate({
    type: extHandler(post.files[0]).ext,
    src:
      "/file.route/?perm=" +
      (await fileServer.loadFile(cookie.pwd, post.files[0])).perm,
    text: post.title + "\n" + post.subreddit,
    click: async () => {
      await new Promise((r) => setTimeout(r, 500));
      location.pathname = "/post";
    },
  });
  postWrap.appendChild(elem);

  localStorage.post = JSON.stringify(post);
};

while (true) {
  showPost();
  await new Promise((r) => setTimeout(r, 5000));
}
