// https://stackoverflow.com/a/6860916
const s4 = function () {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

export const uuid = () => {
  return (
    s4() +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    '-' +
    s4() +
    s4() +
    s4()
  );
};
