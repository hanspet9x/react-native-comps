import { FlexAlignType, FlexStyle, PressableProps, StyleProp, ViewStyle } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


export interface IContainerProps extends PressableProps{
    verHorCenter?: boolean;
    style?: StyleProp<Exclude<FlexStyle,  "alignItems" | "justifyContent"> | ViewStyle>;
    childrenStyle?: FlexStyle;
}

export type TFlexJustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';

export interface IColumnProps extends IContainerProps{
    verAlignment?: TFlexJustifyContent;
    horAlignment?: FlexAlignType;
}

export interface IRowProps extends IContainerProps {
    verHorCenter?: boolean;
    verAlignment?: FlexAlignType;
    horAlignment?: TFlexJustifyContent;
}