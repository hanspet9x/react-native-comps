import { useContext } from "react"
import { IDialogPayload, IDialogProps } from "../dialog/interface";
import { AppContext } from "../context/globalContext"

export const useDialog = () => {
    const {state: {dialog}, action: {dialogAction}} = useContext(AppContext);

    return [dialog, dialogAction] as [IDialogProps, (data: IDialogPayload) => void]
}

