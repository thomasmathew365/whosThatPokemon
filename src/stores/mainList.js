import { writable, Writable } from "svelte/store";
import { getLStorage, setLStorage } from "../utils/common.js";
const IDMin = 1;
const IDMax = 151;
const cacheMax = 5;




let data = [];

function initialList() {
  if (!window.localStorage.getItem("list")) {
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
    window.localStorage.setItem("list", JSON.stringify(list));
    return list;
  }
  return JSON.parse(window.localStorage.getItem("list"));
}

function setResponseToList(response, list, index) {
  list[index] = {
    ...list[index],
    loaded: true,
    image: response?.sprites?.other["official-artwork"].front_default,
    name: response.name,
    options: [],
  };
  return list;
}

// export default function () {
//   async function get() {
//     let list = initialList();
//     setInterval(async () => {
//       const currentLoaded = getLStorage("currentLoaded")
//         ? JSON.parse(getLStorage("currentLoaded"))
//         : -1;
//       const currentViewed = getLStorage("currentViewed")
//         ? JSON.parse(getLStorage("currentViewed"))
//         : -1;
//       try {
//         const response = await fetch(
//           `https://pokeapi.co/api/v2/pokemon/${list[currentLoaded + 1].id}`
//         );
//         if (response.status === 200) {
//           const val = await response.json();
//           list = setResponseToList(val, list, currentLoaded + 1);
//           setLStorage("currentLoaded", currentLoaded + 1);
//           data = list;
//         } else {
//           error.set(true);
//         }
//       } catch (error) {
//         console.log(
//           "🚀 ~ file: mainList.ts ~ line 70 ~ setInterval ~ error",
//           error
//         );
//         error.set(true);
//       }

//       //   list[currentLoaded + 1]
//       //   setLStorage("currentLoaded", currentLoaded + 1);
//     }, 5000);
//   }

//   get();

//   return [data, loading, error, get];
// }

export const fetchStates = {
  IDLE: "idle",
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success",
};

export function fetchFactory() {
  const store = writable({
    status: fetchStates.IDLE,
    data: {
      response: [],
      currentViewed: -1,
    },
  });
  async function get() {
    let list = initialList();
    setInterval(async () => {
		// if ()
      const currentLoaded = getLStorage("currentLoaded")
        ? JSON.parse(getLStorage("currentLoaded"))
        : -1;

      try {
		store.update((prevState) => {			
		  return {
			status: fetchStates.LOADING,
			data: {
			  response: list,
			  currentViewed: prevState.data.currentViewed,
			},
		  };
		});
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${list[currentLoaded + 1].id}`
        );
        if (response.status === 200) {
          const val = await response.json();
          list = setResponseToList(val, list, currentLoaded + 1);
          setLStorage("currentLoaded", currentLoaded + 1);
          store.update((prevState) => {			  
            return {
              status: fetchStates.SUCCESS,
              data: {
                response: list,
                currentViewed: prevState.data.currentViewed,
              },
            };
          });
          //   store.set({ status: fetchStates.SUCCESS, data: { response: list } });
        }
      } catch (e) {
        store.set({ status: fetchStates.ERROR, data: { error: e } });
      }
    }, 5000);
  }

  get();
  return [store, get];
}
