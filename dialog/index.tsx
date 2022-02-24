import React from 'react'
import { useMemo } from 'react'
import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native'
import HiddenViewWrapper from '../hiddenViewWrapper/HiddenViewWrapper'
import TextView from '../textView/textView'
import { IDialogAction, IDialogAlertConfirm, IDialogCustom, IDialogPayload, IDialogProps, TDialogType } from './interface'
import { useDialog } from '../hooks/useDialog';

let dialog: null | ((data: IDialogProps) => void );

export const alert = (data: IDialogAlertConfirm) => {
    if(dialog) {
        dialog({type: "alert", visible: true, ...data})
    }
 }

 export const confirm = (data: IDialogAlertConfirm) => {
    if(dialog) {
        dialog({type: "confirm", visible: true, ...data})
    }
 }

 export const custom = (data: IDialogCustom) => {
    if(dialog) {
        dialog({type: "custom", visible: true, ...data})
    }
 }

const Dialog = () => {
    const [state, action] = useDialog();
    dialog = action;
    return <DialogBox {...state} dispatchActions={action} />
}


export const DialogBox = (props: IDialogProps) => {

    const onHideView = () => {
        props.dispatchActions && props.dispatchActions({type: 'none', visible: false})
    }

    const onConfirm = (stat: boolean) => {
        props.onConfirm && props.onConfirm(stat);
        onHideView();
    }

    const onDefinedCallback = (action: IDialogAction, e: GestureResponderEvent) => {
        action.onPress && action.onPress(e);
        onHideView();
    }
    
    const getActionButtons = useMemo(() => {

        const defaultActions = (type: TDialogType): IDialogAction[] => {
            switch (type) {
                case "alert":
                    return [{ title: "ok", onPress: onHideView }];
                case "confirm":
                case "custom":
                    return [{ title: "cancel", onPress: ()=>onConfirm(false) }, { title: "ok", onPress: ()=>onConfirm(true) }];
                default:
                    return [{ title: "", onPress: onHideView }];
            }
        }

        return (props.actions ?? defaultActions(props.type)).map((dialogAction, index) => (
            <TextView style={[styles.action, dialogAction.style]} key={index} onPress={(e) => onDefinedCallback(dialogAction, e)}>{dialogAction.title}</TextView>
        ));

    }, [props.actions]);

    return (
        <HiddenViewWrapper {...props} onHideView={onHideView} verHorCenter={true} visible={props.visible ?? false}>
            <View>
                <Text>{props.title}</Text>
                <Text>{props.message}</Text>
                <View>
                    {getActionButtons}
                </View>
            </View>
        </HiddenViewWrapper>
    );
}

export default Dialog

const styles = StyleSheet.create({
    action : {
        marginLeft: 10
    }
})
