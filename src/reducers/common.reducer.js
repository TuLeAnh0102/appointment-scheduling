import { commonConstants } from "../constants";
const initialState = {
  sidebarShow: 'responsive',
  toKhaiYTe: 0,
  openPopup: false,
  // idRow: 0
};

export function common(state = initialState, action) {
  switch (action.type) {
    case commonConstants.SIDEBAR_SHOW:
      return {
        ...state,
        sidebarShow: action.sidebarShow,
      };
    case commonConstants.SET_TOKHAI_YTE:
      return {
        ...state,
        toKhaiYTe: action.toKhaiYTe
      }
    case commonConstants.SET_OPEN_POPUP:
      return {
        ...state,
        openPopup: action.setOpenPopup
      }
    
    case commonConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
