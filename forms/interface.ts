import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { IAxiosHTTPError, IAxiosHTTPResponse } from "../../tyroid/net/axios";
import { TResponseType } from "../../tyroid/net/responseType";
import { IInputFieldProps } from "../inputs/interface";
import { IPicker } from "../picker/interface";

export type TFormType = "inputs" | "radio" | "checkbox" | "picker" | "selector" | "switch" | "file" | "node";
export type TInputType = "text" | "textarea" | "email" | "number" | "password" | "date" | "time";
export type TValidation = "text" | "password" | "email" | "date" | "money";



/**
 * Common form controls props.
 */
export interface ICommonFormControls {
    required?: boolean;
    readOnly?: boolean;
    label?: ReactNode;
    bottomLabel?: ReactNode;
    placeholder?: string;
}

export interface IFormSchema<T = unknown> {
    name: string;
    type: TFormType;
    control: IInputFieldProps  | ReactNode | IPicker<T>;
}

/**
 * Form schema type.
 */
export type IFormSchemas<T = unknown> = Array<IFormSchema<T> | IFormSchema<T>[]>;

/**
 * TformFetch Response type.
 */
export type IFormResponse<T> = {
    onSuccess(data: T): void;
    onFailed(): void;
}

/**
 * Adds API to the form.
 */
export type TFormFetch<T> = {
    /**
     * This can either be json, text, arraybuffer, stream or blob.
     */
    responseType?: TResponseType; 
    /**
     * The base url and the post endpoint.
     */
    url: {baseUrl: string,  create: string};
    /**
     * A function called with server response as a param.
     * @param data T - the expected data. 
     */
    onSuccess(data: IAxiosHTTPResponse<T>): void;
    /**
     * It invokes when an error as occured.
     */
    onFailure(error: IAxiosHTTPError):void;
    /**
     * The headers to be sent alongside the request.
     */
    headers?: Record<string, string>;
}

/**
 * The form state validator value.
 */
type TStateValidation = {
    isRequired: boolean;
    isValid: boolean;
}

/**
 * A second argument returned with the onValidation callback.
 */
export type TFormStateValidator = Record<string, TStateValidation>;

/**
 * The returned variables from the form hook.
 */
export type TFormValidationHookStatus = {
    validateStats: boolean[];
    requiredControls: string[];
}

export type TFormSubmitStatus = {
    isValid: boolean;
    inValidControlNames: string[];
}

export type TFormStateChange = Record<string, any>;

export interface IFormProp<T = unknown> {
    /**
     * The form structure.
     */
    schema: IFormSchemas;
    /**
     * The onchange event is mapped to all the form inputs and it is called on the active control.
     * @param name string
     * @param value string
     */
    onChange?(name: string, value: string | unknown): void;
    /**
     * It inverts the validation status of the component.
     * This could be used in disabling the form button. 
     */
    invertValidation?: boolean;
    /**
     * This disables the form fields and button.
     */
    disabled?: boolean;
    /**
     * The label to be displayed on the form.
     */
    actionLabel?: string;
    /**
     * The style to be applied to the button.
     */
    actionStyle?: ViewStyle;
    /**
     * The style to be used for the controls wrapper. 
     */
    controlWrapperStyle?: ViewStyle;
    /**
     * It hides the form button.
     */
    noButton?: boolean;
    /**
     * It calls a function with the boolean status of the form fields. 
     * It does this with the required and regex props on each control.
     * @param isValid boolean
     * @param formInputsStatus TFormStateValidator
     */
    onValidate?(isValid: boolean, formInputsStatus?: TFormStateValidator): void;
    /**
     * It is called when the file control list changes.
     * @param name string
     * @param value FileList
     */
    onFileChange?(name: string, value: unknown): void;
    /**
     * It calls a function with the form validity state and the fields that are required as the first param and 
     * the form field state as the second param.
     * @param formStatus TFormSubmitStatus
     * @param data TFormStateChange
     */
    onSubmit(formStatus: TFormSubmitStatus, data: TFormStateChange): void;
    /**
     * It returns the form controls state object.
     * @param state TFormStateChange
     */
    onFormStateChanged?(state: TFormStateChange): void;
    /**
     * It is a wrapper that helps send form data to a specified end point.
     */
    post?: TFormFetch<T>;
}


export interface IFormRef {
    onSubmit(): void;
}