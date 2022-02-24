
import React, { ChangeEvent } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { IFormSchema } from '../forms/interface';
import Picker from '../picker';
import { IPicker, TPickerSelectedItem } from '../picker/interface';

type Props<T> = {
    data: IFormSchema;
    onChange?(name: string, value: string):void;
    disabled: boolean | undefined;
    onValidated(isValid: boolean, isRequired: boolean, e: {name: string, value: T}): void;
    onSelected(event: TPickerSelectedItem<T>):void;
}

function PickerWrapper<T>({ data, onChange, onValidated, disabled, onSelected }: Props<T>) {
    const control = data.control as IPicker<T>;
    control.disabled = disabled;
    const handleChange = (name: string, value: string) => {
        onChange && onChange(name, value);
    }
    return <Picker {...control} onItemSelected={onSelected} onValidate={onValidated} onChangeText={handleChange}  />
}

export default PickerWrapper;

const styles = StyleSheet.create({})
