import { overviewManager } from "../lib/apiLoader.js";

const all = document.getElementById("all");
const communities = document.getElementById("communities");
const reIndex = document.getElementById("reIndex");

all.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  window.location.pathname = "/allPosts";
});

communities.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  window.location.pathname = "/overview";
});

reIndex.addEventListener("click", async () => {
  let stillIndexing = {
    indexing: true,
  };
  overviewManager
    .reIndex(cookie.pwd)
    .then(() => (stillIndexing.indexing = false));
  indexLoading(stillIndexing);
});

const indexingCard = document.getElementById("indexingCard");
const loading = document.getElementById("loading");
const done = document.getElementById("done");

const indexLoading = async (stillIndexing) => {
  indexingCard.style.display = "unset";
  done.innerText = "";
  loading.innerText = "Indexing";
  while (stillIndexing.indexing) {
    await new Promise((r) => setTimeout(r, 500));
    loading.innerText += ".";
  }
  done.innerText = "done";
  setTimeout(() => {
    indexingCard.style.display = "none";
  }, 3000);
};
