import { ViewStyle, ViewProps, PressableProps, ActivityIndicatorProps } from 'react-native';
export interface IButtonProp extends PressableProps {
    style?: ViewStyle,
    title: string,
    loading?: boolean;
    disabled?: boolean;
    activityIndicator?: ActivityIndicatorProps;
}