import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { IHiddenViewWrapperProps } from "../hiddenViewWrapper/interface";

export interface IDialogAction {
    title: string;
    onPress?(e: GestureResponderEvent):void;
    style?: StyleProp<ViewStyle>;
}

export interface IDialogAlertConfirm extends IDialogAction {
    message: string;
}

export interface IDialogCustom extends IDialogAction {
    message: JSX.Element;
}

export type TDialogType = "alert" | "confirm" | "custom" | "none";

export interface IDialogPayload {
    type: TDialogType;
    title?: string;
    message?: string | JSX.Element;
    actions?: IDialogAction[];
    onConfirm?(action: boolean):void;
    visible?: boolean;
}
export interface IDialogProps extends IDialogPayload, Partial<IHiddenViewWrapperProps>{
    dispatchActions?: (data: IDialogPayload) => void;
}

