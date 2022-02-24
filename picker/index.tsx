
import React, { useState } from 'react'
import { FlatList, Pressable, StyleSheet, ViewStyle } from 'react-native'
import Icons from '../icons'
import InputField from '../inputs'
import { IPicker, IPickerDialog, IPickerTray, TPickerSelectedItem } from './interface'
import Rows from './../layouts/row';
import { appColors } from './../common/colors';
import Columns from './../layouts/column';
import { Modal } from 'react-native'
import AppBarContentWrapper from '../appbar/AppBarContentWrapper'
import { useMemo } from 'react'


const PickerItems = <T,>(props: IPickerTray<T>) => {

    const height: ViewStyle = props.isTrayOpened ? {} : { height: 0, overflow: 'hidden'};
    return (
        <>
            <Columns style={height}>
                {props.items.map((item, index) => (
                    <Pressable onPress={() => props.onItemSelected({ index, name: props.name, item })} key={index}>{props.onRenderItem(item)}</Pressable>
                ))}
            </Columns>
            {/* <FlatList data={props.items} renderItem={({item}) => props.onRenderItem(item) as ListRenderItem<item>} /> */}
        </>
    );
}

const PickerDialog = <T,>(props: IPickerDialog<T>) => {

    const onRender = ({ item, index }: { item: T, index: number }) => <Pressable onPress={() => props.onItemSelected({ index, name: props.name, item })}>{props.onRenderItem(item)}</Pressable>;

    return (
        <Modal {...props} animationType='slide'>
            <AppBarContentWrapper title={props.title} isBack onBackPress={props.onHideDialog}>
                <FlatList data={props.items} renderItem={onRender} keyExtractor={(item, index) => index + ""} />
            </AppBarContentWrapper>
        </Modal>
    )

}

const Picker = <T,>({ renderStyle = "inline", ...props }: IPicker<T>) => {

    const [isTrayOpened, setIsTrayOpened] = useState(false);
    const [selectedItem, setSelectedItem] = useState<T>();

    const stringValue = useMemo(() => {
        let selected: unknown = selectedItem;
        console.log(selected);
        if (props.itemKey) {

            return (selected as Record<string, string>)[props.itemKey];
        }
        return selected as string;
    }, [selectedItem]);

    
    const onSelectItemAndCloseDialog = (selected: TPickerSelectedItem<T>) => {
        handleSelectedItem(selected);
        setIsTrayOpened(false);
    }

    const handleSelectedItem = (selected: TPickerSelectedItem<T>) => {

        setSelectedItem(selected.item);
        props.onItemSelected(selected);
        props.onValidate && props.onValidate(true, props.isRequired ?? false, {name: props.name, value: selected});
    }

    const handleText = (name: string, value: string, isValid: boolean) => {
        props.onChangeText && props.onChangeText(name, value, isValid);
    }

    const handleValidate = (isValid: boolean, isRequired: boolean, prop: {
        name: string;
        value: string;
    }) => {
        props.onValidate && props.onValidate(isValid, isRequired, prop);
    }




    return (

        <Columns>
            <Rows style={styles.inputToggleWrapper} verAlignment='center'>
                {props.itemView ?
                    selectedItem :
                    <InputField {...props} onChangeText={handleText} onValidate={handleValidate} borderType='none' wrapperStyle={{ flex: 1 }} value={stringValue} />
                }
                <Icons onPress={() => setIsTrayOpened(!isTrayOpened)} name='more-down' size={30} color={appColors.iconColor} />
            </Rows>
            {renderStyle === "dialog" ? <PickerDialog onHideDialog={() => setIsTrayOpened(false)} title="Select Name" {...props} onItemSelected={onSelectItemAndCloseDialog} visible={isTrayOpened} /> : <PickerItems {...props} onItemSelected={handleSelectedItem} isTrayOpened={isTrayOpened} />}
        </Columns>
    )
}

export default Picker

const styles = StyleSheet.create({
    inputToggleWrapper: {
        borderWidth: 1,
        borderColor: appColors.inputBorderColor,
        borderRadius: 6,
        paddingHorizontal: 7
    },
    inputStyle: {
        width: '100%',
        backgroundColor: 'red'
    }
})
