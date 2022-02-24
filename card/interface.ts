import { PressableProps, ViewStyle } from "react-native";

export interface ICardProps extends PressableProps{
    animate? :boolean;
    cardStyle: ViewStyle;
}