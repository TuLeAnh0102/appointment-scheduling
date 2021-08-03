import { infoHuman } from "src/constants"
export const setInfoHuman = (info) => {
    return {
        type: infoHuman.INFO_HUMAN,
        payload: info,
    }
}