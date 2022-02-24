import React, { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NodeWrapper = (props: {node: ReactNode}) => {
    return (
        <>
            { props.node}
        </>
    );
}

export default NodeWrapper

const styles = StyleSheet.create({})
