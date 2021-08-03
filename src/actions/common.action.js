import { commonConstants } from "../constants/common.constants";

export const setOpenPopup = (value) => {
    return {
        type: commonConstants.SET_OPEN_POPUP,
        payload: value
    }
}