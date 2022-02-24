import React, { FC } from 'react'
import { Text, TextProps } from 'react-native'

const TextView: FC<TextProps> = ({children, ...props}) => {
    return (typeof children === "string" || typeof children === "number") ? <Text {...props}>{children}</Text> : <>{children}</>
}

export default TextView
