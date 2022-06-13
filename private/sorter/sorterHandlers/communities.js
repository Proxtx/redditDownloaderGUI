import { index } from "../../indexClassHolder.js";

export const compareFunctions = {
  name: (a, b) => {
    return a.subreddit.localeCompare(b.subreddit);
  },
};

export const defaultCompareFunction = "name";

export class SortDataHandler {
  indexFile = index.subredditIndexFile;
  compareFunctions = compareFunctions;
  entrySearchStringProvider = (entry) => {
    return entry.subreddit;
  };
}
