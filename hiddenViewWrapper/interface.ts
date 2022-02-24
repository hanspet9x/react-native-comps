import { StyleProp, ViewStyle } from "react-native";
import { IColumnProps } from "../interfaces/layout";

export interface IHiddenViewWrapperProps extends IColumnProps {

   hideOnTouched?: boolean;
   onHideView(): void;
   visible: boolean;
   style?: StyleProp<ViewStyle>
}