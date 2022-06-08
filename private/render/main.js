import config from "@proxtx/config";

export const server = (document, options) => {
  options.data.needsLogin = options.req.cookies.pwd != config.pwd;
};
