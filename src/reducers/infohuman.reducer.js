import { infoHuman } from "../constants";
const initialState = {
  info_sdt: '',
  info_hoten:'',
};

export function setinfohuman(state = initialState, action) {
  switch (action.type) {
    case infoHuman.INFO_HUMAN:
      return {
          ...state,
          info_sdt: action.payload.sdt,
          info_hoten: action.payload.hoten
      };
    default:
      return state;
  }
}
