import { IDialogPayload, IDialogProps } from "../dialog/interface";

type TEmitter = {
    callback(param?: unknown): void;
    persist: boolean
}
export type TEmitterProp = Map<string, TEmitter>
export interface IAppState {
    dialog: IDialogProps;
    emitter: TEmitterProp;
}

export interface IAppDispatch {
    dialogAction: (data: IDialogProps)=> void;
    emitterAction: (data: TEmitterProp) => void;
}

type TStateTree = IDialogProps | TEmitterProp
export interface IAppContextAction {
    type: keyof IAppState;
    payload: TStateTree;
}

export type IAppContext = {
    state: IAppState,
    action: IAppDispatch
}