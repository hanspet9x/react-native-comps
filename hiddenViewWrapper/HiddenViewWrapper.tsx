import React, { useEffect, useState } from 'react'
import { FC } from 'react'
import {Modal, StyleSheet, useWindowDimensions } from 'react-native'
import Columns from '../layouts/column';
import { IHiddenViewWrapperProps } from './interface';

const HiddenViewWrapper: FC<IHiddenViewWrapperProps> = ({hideOnTouched = true, ...props}) => {



    const { height, width } = useWindowDimensions();
    const onPress = () => {
        if(hideOnTouched) {
            props.onHideView();
        }
    }


    return (
        <Modal visible={props.visible} transparent={true}>
            <Columns
                {...props}
                onPress={onPress}
                style={[props.style, style.wrapper, { width: width, height: height }]}>
                {props.children}
            </Columns>
        </Modal>
    )
}

export default HiddenViewWrapper

const style = StyleSheet.create({
    wrapper: {
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        elevation: 2,
    }
})
