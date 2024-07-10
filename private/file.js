import fs from "fs/promises";
import { increaseCounter } from "./stats.js";

export class File {
  constructor(folder) {
    this.folder = folder;
    return (async () => {
      this.info = JSON.parse(await fs.readFile(this.folder + "/info.json"));
      this.creationTime = new Date(
        (await fs.stat(this.folder + "/info.json")).mtime
      ).getTime();
      return {
        date: this.date,
        title: this.title,
        files: await this.files(),
        author: this.author,
        subreddit: this.subreddit,
        link: this.link,
      };
    })();
  }

  files = async () => {
    let files = await fs.readdir(this.folder);
    if (files.length == 0) increaseCounter("corrupted downloads");
    return this.info.downloads.map((value, index) => {
      for (let i of files) {
        if (i.split(".")[1] == "null") {
          increaseCounter("corrupted downloads");
          //return;
        }
        if (i.split(".")[0] == index) return this.folder + "/" + i;
      }
    });
  };

  get date() {
    return this.info.time ? this.info.time : this.creationTime;
  }

  get title() {
    return this.info.title;
  }

  get author() {
    return this.info.author;
  }

  get subreddit() {
    return this.info.subreddit;
  }

  get link() {
    return "https://reddit.com" + this.info.link;
  }
}
