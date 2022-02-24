import { IconBaseProps } from "react-icons/lib";
import { IconProps } from "react-native-vector-icons/Icon";

export type TIconName = "null"| "back" | "more-vert" | "check" | "clear" | "eye" | "lock" | "eye-closed" | "more-down";


export interface IIcons extends IconProps {
    name: TIconName;
}