import React from 'react'
import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppBar from '.'
import { IAppBar } from './interface'
import { appLayout } from './../common/layout';

const AppBarContentWrapper: FC<IAppBar> = (props) => {
    return (
        <>
            <AppBar {...props} /> 
            <View style={styles.childrenWrapper}>
                {props.children}
            </View>
        </>
    )
}

export default AppBarContentWrapper

const styles = StyleSheet.create({
    childrenWrapper: {
        marginTop: appLayout.appBarHeight
    }
});
