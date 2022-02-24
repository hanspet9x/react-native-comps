import { useRef, useState } from "react";
import { Animated, Easing, EasingFunction, EasingStatic } from "react-native";

export const useAnimated = (value: number | boolean, props?: { duration?: number, easing?: EasingFunction }) => {
    const ref = useRef(value ? 1 : 0)
    const animValue = new Animated.Value(value ? 1 : 0);

    const start = (data: number, durationInSeconds?: number) => {
       
            if(ref.current !== data) {
                Animated.timing(animValue, {
                    useNativeDriver: true,
                    toValue: data,
                    duration: durationInSeconds || (props?.duration || 250),
                    easing: props?.easing || Easing.in(Easing.ease)
                }).start(); 
            }
        ref.current = data;
    }

    const interpolate = (input: number[], output: number[] | string[]) => {
        return animValue.interpolate({
            inputRange: input,
            outputRange: output
        });
    }

    return { start, interpolate } as {
        start(data: number): void,
        interpolate(input: number[], output: number[] | string[]): Animated.AnimatedInterpolation
    }
}