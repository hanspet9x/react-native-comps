import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { TextInputProps, ViewProps } from "react-native";

export interface IInputFieldProps {
    wrapperStyle?: ViewStyle;
    name: string;
    borderType?: "solid" | "bottom" | "none"
    placeholder?: string;
    onChangeText(name: string, value: string, isValid?: boolean): void;
    onValidate?(isValid: boolean, isRequired: boolean, prop: {name: string, value: string | unknown}): void;
    label?: ReactNode;
    isRequired?: boolean;
    regex?: RegExp;
    isPassword?: boolean;
    props?: TextInputProps;
    value?: string;
    isTextArea?: boolean;
    disabled?: boolean;
}