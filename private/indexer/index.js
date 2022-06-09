import config from "@proxtx/config";
import { IndexFile } from "./indexFile.js";
import fs from "fs/promises";
import { SubredditIndex } from "./community.js";

export class Index {
  subredditIndexes = {};

  constructor() {
    return (async () => {
      this.indexFile = await new IndexFile(config.download + "/index.json");
      this.subredditIndexFile = await new IndexFile(
        config.download + "/subredditIndex.json"
      );
      await this.index();
      this.indexLoop();
      return this;
    })();
  }

  indexLoop = async () => {
    this.indexFile.indexNecessary && (await this.index());
    setTimeout(this.indexLoop, this.indexFile.indexIn);
  };

  index = async () => {
    let directories = (
      await fs.readdir(config.download, { withFileTypes: true })
    )
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    let promises = [];

    directories.forEach((value) => {
      promises.push(
        (async () => {
          if (!this.subredditIndexes[value])
            this.subredditIndexes[value] = await new SubredditIndex(value);
          else await this.subredditIndexes[value].index();
        })()
      );
    });

    await Promise.all(promises);

    let index = [];
    let subredditIndex = [];

    for (let subredditName of Object.keys(this.subredditIndexes)) {
      let subreddit = this.subredditIndexes[subredditName];
      for (let i of subreddit.indexFile.index) index.push(i);
      subredditIndex.push({
        subreddit: subredditName,
        previewPost: randomArrayIndex(subreddit.indexFile.index),
      });
    }

    this.indexFile.index = index;
    this.subredditIndexFile.index = subredditIndex;
  };
}

const randomArrayIndex = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};
