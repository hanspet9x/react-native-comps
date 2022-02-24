import React from 'react'
import { FC } from 'react'
import { FlexStyle, Pressable } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { IColumnProps } from '../interfaces/layout'


const Columns: FC<IColumnProps> = (props) => {
    const center: FlexStyle = props.verHorCenter ? {alignItems: "center", justifyContent: "center"}: {};
    const horAlign: FlexStyle | {} = props.horAlignment ? {alignItems: props.horAlignment} : {};
    const verAlign: FlexStyle | {} = props.verAlignment ? {justifyContent: props.verAlignment} : {};
    
    return (
        <Pressable {...props} style={[styles.wrapper, horAlign, verAlign, center, props.style]}>
            {props.children}
        </Pressable>
    )
}

export default Columns

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    }
})
