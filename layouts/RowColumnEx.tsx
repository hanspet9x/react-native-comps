import React, { ReactNode } from 'react'
import { FlexStyle,View } from 'react-native'

const RowColumnEx = ({ children, styles }: { children: ReactNode | ReactNode[], styles?: FlexStyle }) => {
    return (
        <>
            {styles ?
                !Array.isArray(children) ?
                    (<View style={styles}>
                        {children}
                    </View>
                    ) : (
                        children.map((child, index) => <View key={index} style={styles}>{child}</View>)
                    ) : children}

        </>
    )
}

export default RowColumnEx;
