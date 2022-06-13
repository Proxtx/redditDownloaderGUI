import { index } from "../../indexClassHolder.js";

export const compareFunctions = {
  name: (a, b) => {
    return a.title.localeCompare(b.title);
  },
  random: (a, b) => {
    return 0;
  },
  date: (a, b) => {
    return b.date - a.date;
  },
  author: (a, b) => {
    return a.author.localeCompare(b.author);
  },
  subreddit: (a, b) => {
    return a.subreddit.localeCompare(b.subreddit);
  },
};

export const defaultCompareFunction = "date";

export class SortDataHandler {
  constructor(global, subreddit) {
    this.global = global;
    this.subreddit = subreddit;
    this.indexFile = this.global
      ? index.indexFile
      : index.subredditIndexes[this.subreddit].indexFile;
  }

  compareFunctions = compareFunctions;

  entrySearchStringProvider = (entry) => {
    return entry.title + entry.author + entry.subreddit;
  };
}
