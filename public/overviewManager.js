import config from "@proxtx/config";
import {
  sorterProvider,
  sortDataHandlerCompareFunctions,
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
  if (
    sorterResults[sorterDataHandler]?.[sorterAttributes]?.info.dataFrom >=
    sorterInstance.maxDataTime
  )
    sorted = sorterResults[sorterDataHandler][sorterAttributes];
  else sorted = sorterInstance.sort();

  sorterResults[sorterDataHandler]
    ? (sorterResults[sorterDataHandler][sorterAttributes] = sorted)
    : (sorterResults[sorterDataHandler] = { [sorterAttributes]: sorted });

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
  };
};
