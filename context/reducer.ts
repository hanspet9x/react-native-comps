import { IAppContextAction, IAppState } from "./interface";

export const appReducer = (state: IAppState, action: IAppContextAction) => {

    return {...state, [action.type]: action.payload[action.type]}
}