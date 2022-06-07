import fs from "fs/promises";
import config from "@proxtx/config";

export class IndexFile {
  constructor(file) {
    this.file = file;
    return (async () => {
      let index;
      try {
        await fs.access(file);
        index = JSON.parse(await fs.readFile(file, "utf8"));
      } catch {
        index = {
          info: {
            indexed: false,
            time: null,
          },
          index: [],
        };
      }
      this.indexObj = index;
      return this;
    })();
  }

  get indexed() {
    return this.indexObj.info.indexed;
  }

  get info() {
    return this.indexObj.info;
  }

  get indexNecessary() {
    return this.indexed
      ? Date.now() - this.indexObj.info.time > config.indexInterval
      : true;
  }

  get indexIn() {
    return this.indexed
      ? config.indexInterval - (Date.now() - this.indexObj.info.time)
      : 1;
  }

  get index() {
    return this.indexObj.index;
  }

  set index(index) {
    this.indexObj.info.indexed = true;
    this.indexObj.info.time = Date.now();
    this.indexObj.index = index;
    this.save();
  }

  save = async () => {
    await fs.writeFile(this.file, JSON.stringify(this.indexObj, null, 2));
  };
}
