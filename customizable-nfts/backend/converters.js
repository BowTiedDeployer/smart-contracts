// format: "{'keyA':'valueA', 'keyB':'valueB', keyC':'valueC'}",
export const stringToMap = (text) => {
  text = text.slice(1, -1);
  let mapConverted = {};
  text.split(',').forEach((keyValue) => {
    const splitted = keyValue.split(':');
    mapConverted[splitted[0].split("'")[1]] = splitted[1];
  });
  return mapConverted;
};
