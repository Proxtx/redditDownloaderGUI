import { SortedOverview } from "./sortedOverview.js";
import { generate } from "./elementGenerator.js";
import { overviewManager, fileServer } from "./apiLoader.js";
import { extHandler } from "./lib.js";
import { SortController } from "./sortController.js";

export const initGUI = async (
  postsWrap,
  optionsWrap,
  sorterDataHandler,
  sorterDataHandlerAttributes,
  generatorObjectHandler
) => {
  new SortedOverview(
    postsWrap,
    async (start, end, sortController) => {
      let result = await overviewManager.loadOverview(
        cookie.pwd,
        sorterDataHandler,
        sorterDataHandlerAttributes,
        sortController.sortAttributes,
        start,
        end
      );
      let promises = [];
      for (let post of result.result) {
        promises.push(
          (async () => {
            postsWrap.appendChild(
              generate(
                await generatorObjectHandler(post, fileServer, extHandler)
              )
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
        await overviewManager.sortDataHandlerSortingOptions(
          cookie.pwd,
          sorterDataHandler
        )
      ).sortingOptions
    )
  );
};
