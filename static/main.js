import { SortedOverview } from "./lib/sortedOverview.js";
import { generate } from "./lib/elementGenerator.js";
import { overviewManager, fileServer } from "./lib/apiLoader.js";
import { extHandler } from "./lib/lib.js";
import { SortController } from "./lib/sortController.js";

let optionsWrap = document.getElementById("optionsWrap");
let wrapper = document.getElementById("contentWrapper");

new SortedOverview(
  wrapper,
  async (start, end, sortController) => {
    let result = await overviewManager.loadOverview(
      cookie.pwd,
      "posts",
      [true, ""],
      sortController.sortAttributes,
      start,
      end
    );
    let promises = [];
    for (let post of result.result) {
      if (!post.files?.[0]) {
        console.log(post);
        continue;
      }
      promises.push(
        (async () => {
          let extHandlerResult = extHandler(post.files[0]);
          let download = await fileServer.loadFile(cookie.pwd, post.files[0]);
          wrapper.appendChild(
            generate({
              text: post.title,
              data: extHandlerResult.prefix + download.data,
              textSize: "none",
              type: extHandlerResult.ext,
            })
          );
        })()
      );
    }

    await Promise.all(promises);

    return result.finished;
  },
  new SortController(
    optionsWrap,
    (
      await overviewManager.sortDataHandlerSortingOptions(cookie.pwd, "posts")
    ).sortingOptions
  )
);
