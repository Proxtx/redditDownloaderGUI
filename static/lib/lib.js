let extensionToPrefix = {
  default: "data:image/png;base64,",
  mp4: "data:video/mp4;base64,",
};

export const extHandler = (file) => {
  let ext = file.split(".").pop();
  return {
    ext: extensionToPrefix[ext] ? ext : "img",
    prefix: extensionToPrefix[ext]
      ? extensionToPrefix[ext]
      : extensionToPrefix.default,
  };
};
