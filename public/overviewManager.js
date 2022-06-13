import config from "@proxtx/config";
import {
  sorterProvider,
  sortDataHandlerCompareFunctions,
  defaultCompareFunction,
} from "../private/sorter/sorterProvider.js";

let sorterResults = {};

export const loadOverview = (
  pwd,
  sorterDataHandler,
  sorterDataHandlerAttributes,
  sorterAttributes,
  start,
  end
) => {
  if (pwd != config.pwd) return { success: false };
  let sorterInstance = sorterProvider(
    sorterDataHandler,
    sorterDataHandlerAttributes,
    sorterAttributes
  );
  let sorted;

  let sortedIdArray = [
    sorterDataHandler,
    ...sorterDataHandlerAttributes,
    ...sorterAttributes,
  ];

  if (
    sorterResults[sortedIdArray]?.info.dataFrom >= sorterInstance.maxDataTime
  ) {
    sorted = sorterResults[sortedIdArray];
  } else {
    sorted = sorterInstance.sort();
    sorterResults[sortedIdArray] = sorted;
  }

  return {
    success: true,
    info: sorted.info,
    result: sorted.result.slice(start, end),
    finished: end >= sorted.result.length,
  };
};

export const sortDataHandlerSortingOptions = (pwd, sortDataHandler) => {
  if (pwd != config.pwd) return { success: false };
  return {
    success: true,
    sortingOptions: sortDataHandlerCompareFunctions(sortDataHandler),
    default: defaultCompareFunction(sortDataHandler),
  };
};
