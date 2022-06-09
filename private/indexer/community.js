import { File } from "../file.js";
import { IndexFile } from "./indexFile.js";
import config from "@proxtx/config";
import fs from "fs/promises";

export class SubredditIndex {
  folder;

  constructor(subreddit) {
    this.folder = config.download + "/" + subreddit;

    return (async () => {
      this.indexFile = await new IndexFile(this.folder + "/index.json");
      if (this.indexFile.indexNecessary) await this.index();
      await this.index();
      return this;
    })();
  }

  index = async () => {
    let directories = (await fs.readdir(this.folder, { withFileTypes: true }))
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

    let index = [];
    let promises = [];

    directories.forEach((value) => {
      promises.push(
        (async () => {
          index.push(await new File(this.folder + "/" + value));
        })()
      );
    });

    await Promise.all(promises);

    this.indexFile.index = index;
  };
}
