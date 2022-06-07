export class Sorter {
  constructor(dataHandler, sortBy, reverse, search) {
    this.sortBy = sortBy;
    this.reverse = reverse;
    this.search = search.trim();
    this.dataHandler = dataHandler;
  }

  get maxDataTime() {
    return this.dataHandler.indexFile.info.time;
  }

  sort() {
    let compareFunctions = this.dataHandler.compareFunctions;
    let shuffledArray = shuffle(this.dataHandler.indexFile.index);

    let sortedArray = shuffledArray.sort(compareFunctions[this.sortBy]);

    if (this.reverse) sortedArray = sortedArray.reverse();

    if (this.search && this.search.length > 0 && typeof this.search == "string")
      sortedArray = sortedArray.filter((v) =>
        this.dataHandler
          .entrySearchStringProvider(v)
          .toUpperCase()
          .includes(this.search.toUpperCase())
      );

    return {
      info: {
        dataFrom: this.dataHandler.indexFile.info.time,
      },
      result: sortedArray,
    };
  }
}

const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
