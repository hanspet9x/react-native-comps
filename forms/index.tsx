import React, { useEffect, ReactNode, useState } from 'react';
import { StyleSheet, View } from 'react-native'
import { IFormProp, IFormRef, IFormSchema, TFormStateValidator } from './interface';
import { useFormValidation } from '../hooks/form';
import Button from './../buttons/button';
import NodeWrapper from './node.wrapper';
import { TPickerSelectedItem } from '../picker/interface';
import PickerWrapper from '../pickerWrapper';
import InputWrapper from '../inputWrapper/InputWrapper';
import { axiosHttp } from '../../tyroid/net/axios';
import Rows from './../layouts/row';

const Form = (props: IFormProp) => {
   

    const [controlsState, setControlsState] = useState({});

    const [storeValidation, setStoreValidation] = useState({} as TFormStateValidator);

    const [validate, setValidate] = useFormValidation();

    useEffect(() => {
        props.onValidate && props.onValidate(!validate.length, storeValidation);
        props.onFormStateChanged && props.onFormStateChanged(controlsState);
    });

    const InlineControlWrapper = ({control}: {control: ReactNode}) => (
        <View style={styles.inlineWrapper}>{control}</View>
    );

    const inlineParentControlWrapper = (inlineControlWrappers: ReactNode) => (
        <Rows style={[styles.parentWrapper, props.controlWrapperStyle]}>{inlineControlWrappers}</Rows>
    );

    const controlWrapper = (control: ReactNode, index: number) => (
        <View key={index} style={[styles.controlWrapper, props.controlWrapperStyle]}>{control}</View>
    )

    

    const onChange = (name: string, value: string) => {
        console.log(name, value);
        setControlsState((state) => ({...state, [name]: value}));
        props.onChange && props.onChange(name, value as string);
    }

    const onValidate = (isValid: boolean, isRequired: boolean, e: {name: string, value: string}) => {
        setStoreValidation((state) => {
            const currentState = {...state, [e.name]: {isRequired, isValid}}
            props.onValidate && setValidate(currentState);
            return currentState;
        });
    }

    const onSelected = (selectedData: TPickerSelectedItem) => {
        setControlsState((state) => ({...state, [selectedData.name]: selectedData.item}));
        props.onChange && props.onChange(selectedData.name, selectedData.item); 
    }

    const splitControls = (control: IFormSchema): ReactNode => {
        switch (control.type) {
            case "inputs":
               return  <InputWrapper onValidated={onValidate} data={control} onChange={onChange} disabled={props.disabled}  />
            case "picker":
                return  <PickerWrapper onSelected={onSelected} onValidated={onValidate} data={control} onChange={onChange} disabled={props.disabled}  />
            case "node":
                return <NodeWrapper  node={control.control} />
            default:
                return <></>;
        }
    }

    const onFormSubmit = () => {
        props.onSubmit({isValid: !validate.length, inValidControlNames: validate}, controlsState);
        if(props.post) {
            const {url: {baseUrl, create}, headers, responseType, onSuccess, onFailure} = props.post;  
          axiosHttp({
            responseType,
            url: baseUrl ?? "" + create ?? "",
            headers,
            method: "POST",
            onSuccess,
            onFailure
          });  
        }
    }

    const renderControls = () => {
        return props.schema.map((control: IFormSchema | IFormSchema[], index: number) => {
            if (Array.isArray(control)) {
                return inlineParentControlWrapper(control.map((inlineControl: IFormSchema, index2: number) => <InlineControlWrapper key={index2} control={splitControls(inlineControl)} />))
                
            } else {
                return controlWrapper(splitControls(control), index);
            }
        });
    }
    return (
        <View >
            {renderControls()}
            {props.noButton ? null : <Button style={props.actionStyle} title={props.actionLabel || "Save"} onPress={onFormSubmit} />}
        </View>
    );
}

export default Form; //forwardRef(Form);
const styles = StyleSheet.create({
    parentWrapper: {
        marginBottom: 10
    },

    inlineWrapper: {

    },
    controlWrapper: {
        marginBottom: 5
    }

})
