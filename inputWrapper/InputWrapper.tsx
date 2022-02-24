import React from 'react'
import { View, Text } from 'react-native'
import { IFormSchema } from '../forms/interface';
import InputField from '../inputs';
import { IInputFieldProps } from '../inputs/interface';

type Props = {
    data: IFormSchema;
    onChange(name: string, value: string): void;
    disabled: boolean | undefined;
    onValidated(isValid: boolean, isRequired: boolean, e: { name: string, value: unknown }): void;
}

function InputWrapper({ data, onChange, onValidated, disabled }: Props) {
    const control = data.control as IInputFieldProps;
    control.disabled = disabled;

    return (
        <InputField
            label={control.label}
            placeholder={control.placeholder}
            onValidate={onValidated}
            {...control}
            name={data.name}
            onChangeText={onChange}
        />

    );
}

export default InputWrapper
