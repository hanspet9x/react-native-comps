import React, { FC, useEffect, useState } from 'react'
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'

type Props = {
    source: number | string;
}
const SplashScreenImage = ({ source }: Props) => {

    useEffect(() => {
        if(typeof source === "string") {
            Image.prefetch(source);
        }
    }, []);

    const ScreenImage: FC = (props) => {
        return (
            <View>
                <StatusBar hidden={true} />
                {props.children}
            </View>
        );
    }

    if (typeof source === "number") {
        return (
            <ScreenImage>
                 <Image source={source} resizeMethod='auto' resizeMode='contain' />
            </ScreenImage>
        );
    } 

    return  (
        <ScreenImage>
            <Image source={{uri: source}} resizeMethod='auto' resizeMode='contain' />
        </ScreenImage>
    )

}



export default SplashScreenImage

const styles = StyleSheet.create({})
