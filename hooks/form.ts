import { useState } from "react"
import { TFormStateValidator } from "../forms/interface";

export const useFormValidation = () => {

    const [validStatus, setValidStatus] = useState([] as string[])
    
    const onValidate = (data: TFormStateValidator) => {
        let result:string[] = [];

        const reduced = Object.entries(data).reduce((iResult, [key, value]) => {
            if(value.isRequired) {
                if(!value.isValid) {
                    return [...iResult, key];
                }
                return iResult;
            }
            return iResult;
        }, result);

        setValidStatus(reduced)

    }

    return [validStatus, onValidate] as [string[], (data: TFormStateValidator) => void ];

}