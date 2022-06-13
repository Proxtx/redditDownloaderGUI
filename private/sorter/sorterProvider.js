import { Sorter } from "./sorter.js";

const sortDataHandlers = {
  communities: await import("./sorterHandlers/communities.js"),
  posts: await import("./sorterHandlers/posts.js"),
};

export const sorterProvider = (
  sortDataHandlerName,
  sorterDataHandlerAttributes,
  sorterAttributes
) => {
  let sortDataHandler = sortDataHandlers[sortDataHandlerName];
  let sorter = new Sorter(
    ...[
      ...[new sortDataHandler.SortDataHandler(...sorterDataHandlerAttributes)],
      ...sorterAttributes,
    ]
  );
  return sorter;
};

export const sortDataHandlerCompareFunctions = (sortDataHandler) => {
  return Object.keys(sortDataHandlers[sortDataHandler].compareFunctions);
};

export const defaultCompareFunction = (sortDataHandler) => {
  return sortDataHandlers[sortDataHandler].defaultCompareFunction;
};
