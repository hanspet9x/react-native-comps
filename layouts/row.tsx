import React from 'react'
import { FC } from 'react'
import { FlexStyle, Pressable } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { IRowProps } from './../interfaces/layout/index';
import RowColumnEx from './RowColumnEx';


const Rows: FC<IRowProps> = (props) => {
    const center: FlexStyle = props.verHorCenter ? {alignItems: "center", justifyContent: "center"}: {};
    const horAlign: FlexStyle | {} = props.horAlignment ? {justifyContent: props.horAlignment} : {};
    const verAlign: FlexStyle | {} = props.verAlignment ? {alignItems: props.verAlignment} : {};
    
    return (
        <Pressable {...props} style={[styles.wrapper, horAlign, verAlign, center, props.style]}>
            <RowColumnEx children={props.children} styles={props.childrenStyle} />
        </Pressable>
    )
}

export default Rows

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    }
})
