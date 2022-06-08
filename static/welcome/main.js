const all = document.getElementById("all");
const communities = document.getElementById("communities");

all.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  window.location.pathname = "/allPosts";
});

communities.addEventListener("click", async () => {
  await new Promise((r) => setTimeout(r, 200));
  window.location.pathname = "/overview";
});
