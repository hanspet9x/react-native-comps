import { ReactNode } from "react";
import { ImageProps } from "react-native";

export interface ImageText extends ImageProps {
    loaded?: boolean;
    text: ReactNode;
    subText?: ReactNode;
}