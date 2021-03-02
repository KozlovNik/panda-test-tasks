import { data } from "./constants";

function customSort(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const initialState = {
  column: null,
  order: null,
  page: 1,
  search: "",
  data: data,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        data: initialState.data.filter(({ address, description, ...rest }) =>
          Object.values(rest).some((p) =>
            p.toString().toLowerCase().includes(action.search.toLowerCase())
          )
        ),
        page: 1,
        order: null,
        column: null,
      };
    case "SET_SORT":
      let order;
      let copiedData = [...state.data];
      if (
        !state.order ||
        state.order !== "ASC" ||
        state.column !== action.column
      ) {
        order = "ASC";
        copiedData.sort((a, b) => {
          return customSort(a[action.column], b[action.column]);
        });
      } else {
        order = "DESC";
        copiedData.sort((a, b) => {
          return customSort(b[action.column], a[action.column]);
        });
      }
      return { ...state, column: action.column, data: copiedData, order };
    case "SET_PAGE":
      return { ...state, page: action.page };
    default:
      return state;
  }
}
