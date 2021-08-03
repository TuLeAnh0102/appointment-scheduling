import { categoryConstants } from "../constants";
const initialState = {
    categoryTinh: [],
    categoryHuyen: [],
    categoryXa:[]
};

export function common(state = initialState, action) {
  switch (action.type) {
    case categoryConstants.GETALL_TINH_REQUEST:
      return {
        ...state,
        categoryTinh: action.data,
      };
    case categoryConstants.GETALL_HUYEN_REQUEST:
      return {
        ...state,
        categoryHuyen: action.data
      }
    case categoryConstants.GETALL_XA_REQUEST:
      return {
        ...state,
        categoryXa: action.data
      }
    default:
      return state;
  }
}
