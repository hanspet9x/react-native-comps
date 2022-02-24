import React, { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { appColors } from './../common/colors';
import { ICardProps } from './interface';

const Card: FC<ICardProps> = (props) => {
    return (
        <Pressable {...props} style={[styles.container, props.cardStyle]} >
            {props.children}
        </Pressable>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        borderRadius: 6,
        backgroundColor: appColors.surface,
        elevation: 2
    }
})
