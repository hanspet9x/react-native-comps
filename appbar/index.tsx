import React, { useMemo, useState } from 'react'
import { Platform, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import HiddenViewWrapper from '../hiddenViewWrapper/HiddenViewWrapper';
import Icons from '../icons';
import { IAppBar, IAppBarIcons, TAction, TAppBarHiddenOption } from './interface'
import { appLayout } from './../common/layout';
import Rows from './../layouts/row';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { appColors } from './../common/colors';

export const APP_BAR_MAIN_ICON = "APP_BAR_MAIN_ICON";
export const APP_BAR_ICON_SIZE = 30;

const AppBar = (props: IAppBar) => {
    const [extraOptionsVisible, setExtraOptionsVisible] = useState(false);

    const onHiddenOptionPress = (data: TAction) => {
        setExtraOptionsVisible(false);
        handlePressIcons(data);
    }

    /**
 * this is triggered by the last more icon to show the hidden icons.
 */
    const handleMorePressed = () => {
        setExtraOptionsVisible(true);
    }

    const handlePressIcons = (data: TAction) => {
        console.log(data)
        props.onActionClicked && props.onActionClicked(data)
    }

    const secIcons = useMemo(() => {
        let visibleIcons: IAppBarIcons[] = [];
        let hiddenIcons: IAppBarIcons[] = [];

        props.secondaryIcons && props.secondaryIcons.forEach((icon) => {
            icon.show ? visibleIcons.push(icon) : hiddenIcons.push(icon);
        });

        return { visibleIcons, hiddenIcons };
    }, [props.secondaryIcons]);

    // console.info(secIcons);
    return (
        <>
            <StatusBar backgroundColor={props.noBgColor ? appColors.background : appColors.appBar} barStyle={'dark-content'} />
            <Rows style={[styles.wrapper, {backgroundColor: props.noBgColor ? appColors.background : appColors.appBar, elevation: props.noBgColor ? 0 : 2}]} horAlignment="space-between" verAlignment='center'>
                <TouchableHighlight />
                <View style={styles.mainIconWrapper}>
                    <Pressable onPress={() => handlePressIcons({ title: APP_BAR_MAIN_ICON, index: 0 })}>
                        {
                            props.isBack ? <Icons name='back' size={30} onPress={()=>{props.onBackPress && props.onBackPress()}} /> :
                                props.primaryIcon ? props.primaryIcon : <></>
                        }
                    </Pressable>
                    <View style={styles.textsWrapper}>
                        <Text style={styles.title}>{props.title}</Text>
                        <Text style={[{ display: props.subTitle ? 'flex' : 'none' }, styles.subtitle]}>{props.subTitle}</Text>
                    </View>
                </View>

                <Rows verAlignment="center" >
                    <Rows childrenStyle={{ marginLeft: 20 }} verAlignment='center'>
                        {props.secondaryIcons && secIcons.visibleIcons.map((icon, index) => (
                            <Pressable key={index} onPress={() => handlePressIcons({ title: icon.title, index })}>
                                {icon.icon}
                            </Pressable>
                        ))}
                    </Rows>
                    {secIcons.hiddenIcons.length ? <Icons onPress={handleMorePressed} name='more-vert' size={APP_BAR_ICON_SIZE} style={{ marginLeft: 10 }} /> : <></>}
                </Rows>

            </Rows>
            <HiddenViewWrapper onHideView={()=>{setExtraOptionsVisible(false)}} style={{opacity: 1, backgroundColor: 'unset'}} horAlignment='flex-end' visible={extraOptionsVisible}>
                <HiddenOptions icons={secIcons.hiddenIcons} offsetCount={secIcons.visibleIcons.length} onIconPresed={onHiddenOptionPress} />
            </HiddenViewWrapper>
        </>
    )
}

/***
 * It creates the view of hidden icons seen when the toggler is pressed.
 * @param props TAppBarHiddenOption
 * @returns ReactNode
 */
const HiddenOptions = (props: TAppBarHiddenOption) => {

    const handlePress = (icon: IAppBarIcons, index: number) => {
        props.onIconPresed({ title: icon.title, index: props.offsetCount + index + 1 })
    }

    return (
        <View style={styles.hiddenOptionColumn}>
            {
                props.icons.map((icon, index) =>
                (<Rows
                    verAlignment='center'
                    childrenStyle={{ marginRight: 10 }}
                    style={styles.hiddenOptionRow}
                    onPress={() => handlePress(icon, index)}
                    key={index}>
                    {icon.icon}
                    <Text style={{ fontSize: 16 }}>{icon.title}</Text>
                </Rows>))
            }
        </View >
    )
}

export default AppBar

const styles = StyleSheet.create({

    wrapper: {
        height: appLayout.appBarHeight,
        backgroundColor: appColors.appBar,
        elevation: 1,
        shadowRadius: 2,
        shadowColor: "black",

        paddingHorizontal: 20,
        position: 'absolute',
        width: '100%'

    },

    mainIconWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },

    textsWrapper: {
        marginLeft: 10
    },
    title: {
        fontSize: 20
    },
    subtitle: {
        fontSize: 18
    },
    appSecondaryIcons: {
        backgroundColor: 'green'
    },

    hiddenOptionColumn: {
        width: 200,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 6,
        elevation: 2
    },

    hiddenOptionRow: {
        marginVertical: 14,
    }
})
