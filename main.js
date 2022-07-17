import { listen } from "@proxtx/framework";
import { setConfig } from "@proxtx/framework/static.js";
import config from "@proxtx/config";

setConfig({ customScriptFileExtensions: [".html", ".route"] });
console.log("Indexing...");
await listen(config.port);
console.log("Server running on port", config.port);
