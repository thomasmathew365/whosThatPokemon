import { pokemonNames } from "./constants";

export function getLStorage(key) {
  return window.localStorage.getItem(key);
}

export function setLStorage(key, value) {
  return window.localStorage.setItem(key, value);
}

export function initialList() {
  const IDMin = 1;
  const IDMax = 151;
  const cacheMax = 5;
  //   if (!window.localStorage.getItem("list")) {
  let list = [];
  let defaultProps = {
    loaded: false,
    viewed: false,
    image: "",
    name: "",
    options: [],
    id: 0,
  };
  for (let index = IDMin; index < IDMax; index++) {
    list.push(index);
  }
  // !! randomize the list
  list.sort(() => Math.random() - 0.5);
  // !! create new object
  list = list.map((listItem) => {
    return { ...defaultProps, id: listItem };
  });
//   window.localStorage.setItem("list", JSON.stringify(list));
  return list;
  //   }
  //   return JSON.parse(window.localStorage.getItem("list"));
}

export function getOptionList(name) {
  const randomizedNames = [
    ...pokemonNames.sort(() => Math.random() - 0.5).slice(0, 3),
    name,
  ].sort(() => Math.random() - 0.5);
  return randomizedNames;
}
