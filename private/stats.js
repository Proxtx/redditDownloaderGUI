let counters = {};

export const setCounter = (name, value = 0) => {
  counters[name] = value;
};

export const getCounter = (name) => {
  if (counters[name]) return counters[name];
  return 0;
};

export const increaseCounter = (name, increase = 1) => {
  if (!counters[name]) counters[name] = 0;
  counters[name] += increase;
};

export const getCounters = () => {
  return Object.keys(counters);
};
