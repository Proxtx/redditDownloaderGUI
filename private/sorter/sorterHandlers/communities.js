import { index } from "../../indexClassHolder.js";

export const compareFunctions = {
  name: (a, b) => {
    return a.subreddit.localeCompare(b.subreddit);
  },
  random: (a, b) => {
    return 0;
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
