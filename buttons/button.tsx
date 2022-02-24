import React from 'react'
import { ActivityIndicator, GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native'
import { IButtonProp } from './interface'
import { appColors } from './../common/colors';
import { useMemo } from 'react';

const Button = (props: IButtonProp) => {

    const onHandlePress = (ev: GestureResponderEvent) => {
        if(!props.disabled) {
            props.onPress && props.onPress(ev);
        }
    }

    const style = useMemo(() => {
        return props.disabled ? {backgroundColor: 'lightgray'} : {}
    },[props.disabled]);

    return (
        <Pressable {...props} style={[style, styles.wrapper, props.style]} onPress={onHandlePress}>
            {props.loading ? <ActivityIndicator color={appColors.activityIndicator} style={styles.indicator} {...props.activityIndicator} /> : <></>}
            <Text style={styles.label}>{props.title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: appColors.primary,
        flexDirection: "row",
        elevation: 1,
        padding: 12,
        alignSelf: 'flex-start',
        borderRadius: 4,

    },

    indicator: {
        marginRight: 10,
        color: 'blue'
    },

    label: {
        fontSize: 16,
        color: appColors.primaryContrast
    }
})
