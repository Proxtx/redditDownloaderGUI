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
	  try {
	     let fileIndex = await new File(this.folder+"/"+value);
             let files = fileIndex.files;
             for(let file of files) {
		let size = (await fs.stat(file)).size;
                if(size < 1000) throw new Error("size too small"); 
                //console.log(size);
             }
             index.push(await new File(this.folder + "/" + value));
          }
          catch(e){
             // await fs.rm(this.folder+"/"+value,{recursive: true, force: true});
             console.log("error indexing", value);
          }
        })()
      );
    });

    await Promise.all(promises);

    this.indexFile.index = index;
  };
}
