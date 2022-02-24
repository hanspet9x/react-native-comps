import { ReactNode } from "react";
import { ModalProps } from "react-native";
import { IInputFieldProps } from './../inputs/interface';

export type TPickerSelectedItem<T = unknown> = {
    item: T;
    index: number;
    name: string;
}

export interface IPicker<T = unknown> extends IInputFieldProps{
    onRenderItem(item: T): ReactNode;
    items: T[];
    onItemSelected(item: TPickerSelectedItem<T>):void;
    renderStyle?: "dialog" | "inline";
    itemKey?: string;
    itemView?: boolean;

}

export interface IPickerTray<T> extends IPicker<T> {
    isTrayOpened: boolean;
}

export interface IPickerDialog<T> extends ModalProps, IPicker<T> {
    title: string;
    onHideDialog():void;
}