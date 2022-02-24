import React, { useState } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import AppBar from './appbar';
import { IAppBarIcons } from '../rn.comps/appbar/interface';
import Icon from 'react-native-vector-icons/MaterialIcons';
import InputField from './inputs';
import { ScrollView } from 'react-native-gesture-handler';
import Picker from './picker/index';
import AppBarContentWrapper from './appbar/AppBarContentWrapper';
import Form from './forms';
import { IFormSchemas, TFormStateChange, TFormSubmitStatus } from './forms/interface';
import { IInputFieldProps } from './inputs/interface';
import { IPicker } from './picker/interface';
import Button from './buttons/button';
import Dialog from './dialog';

const ComponentViews = () => {
    const size = 30;
    const secIcons: IAppBarIcons[] = [
        {
            icon: <Icon name="group-add" size={size} />,
            show: true,
            title: "group add"
        }, {
            icon: <Icon name="group-add" size={size} />,
            show: true,
            title: "group add"
        }, {
            icon: <Icon name="more-time" size={size} />,
            show: true,
            title: "more time"
        }, {
            icon: <Icon name="more-time" size={size} />,
            show: false,
            title: "more time"
        }, {
            icon: <Icon name="more-time" size={size} />,
            show: false,
            title: "more time"
        }, {
            icon: <Icon name="more-time" size={size} />,
            show: false,
            title: "more tim"
        }
    ]

    const [state, setValue] = useState({ first: "", last: "" });
    const handleChange = (name: string, value: string) => {
        // setValue({...state, [name]: value})
    }

    const title = (title: string) => {
        return <Text style={styles.sectionTitle}>{title}</Text>
    }

    const data: string[] = ["Anderson", "Roland", "Kate", "Badmus"];

    const itemSkin = (data: string) => {
        return <Text style={{ fontSize: 16, paddingVertical: 8 }}>{data}</Text>
    }

    const schema: IFormSchemas = [
        {
            name: "name",
            type: "inputs",
            control: {
                placeholder: "FullName"
            } as IInputFieldProps
        },
        {
            name: "gender",
            type: "picker",
            control: {
                placeholder: "Select Gender",
                items: ["Ade", "bisi"],
                onRenderItem: (item: string) => <Text>{item}</Text>
            } as IPicker
        }
    ];

    const handleSubmit = (formStatus: TFormSubmitStatus, data: TFormStateChange) => {
        console.log("FormStatus", formStatus);
        console.log("data", data);
    }

    const handlePress = () => {
        // return Dialog.alert({message: "We are here", title: "Hello"})
    }

    return (

        <AppBarContentWrapper title='Home' isBack secondaryIcons={secIcons} >
            <ScrollView>
                <View style={{ margin: 10 }}>
                    {title('Button')}
                    <Button title='Submit Form' loading={false} onPress={handlePress} />
                    {title('forms')}
                    <Form schema={schema} onSubmit={handleSubmit}  />
                    {title('inputs')}
                    <InputField props={{ editable: false }} borderType='bottom' placeholder='First Name' onChangeText={handleChange} name='first' />
                    <InputField placeholder='Last Name' onChangeText={handleChange} name='last' />
                    <InputField placeholder='Last Name' isPassword onChangeText={handleChange} name='last' />
                    <InputField placeholder='Last Name' isPassword onChangeText={handleChange} name='last' />
                    <InputField placeholder='Textarea' onChangeText={handleChange} name='last' isTextArea />
                    {title('picker')}
                    <Picker renderStyle='dialog' onItemSelected={console.log} name="picker" placeholder='Choose names' onChangeText={handleChange} items={data} onRenderItem={itemSkin} />
                </View>
            </ScrollView>
        </AppBarContentWrapper>
    )
}

export default ComponentViews;

const styles = StyleSheet.create({
    sectionTitle: {
        backgroundColor: 'lightblue',
        padding: 20,
        marginVertical: 10
    }
})
