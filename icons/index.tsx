import AppConstants from "../utils/app.constant"

import React from 'react'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IIcons } from "../interfaces/icons";


const Icons = (props: IIcons) => {

    switch (props.name) {
        case "null":
            return <></>
        case "back":
            return <Icon {...props} name={AppConstants.isIOS ? "arrow-back-ios" : "arrow-back"}  />
        case "more-vert":
            return <Icon {...props} name="more-vert" />
        case "check":
            return <Icon {...props} name="check" />
        case "clear":
            return <Icon {...props} name="clear" />
        case "lock":
            return <Icon {...props} name="lock" />
        case "eye":
            return <Icon {...props} name="visibility" />
        case "eye-closed":
            return <Icon {...props} name="visibility-off" />
        case "more-down":
            return <Icon {...props} name="expand-more" />
        default:
            return <Icon {...props} name={props.name} />
    }
}

export default Icons

const styles = StyleSheet.create({})
