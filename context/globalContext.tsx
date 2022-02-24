import React, { FC, useMemo, useReducer } from 'react'
import { IDialogPayload, IDialogProps, TDialogType } from '../dialog/interface';
import { IAppContext, IAppDispatch, IAppState, TEmitterProp } from './interface';
import { appReducer } from './reducer';

const initialState: IAppState = {
    dialog: {
        type: "none",
        visible: false,
    } as IDialogProps,
    /**
     * The event emitter.
     */
    emitter: new Map(),
}

const initialDispatch:IAppDispatch = {
    dialogAction: () =>{},
    emitterAction: ()=>{}
} 

export const AppContext = React.createContext<IAppContext>({state: initialState, action: initialDispatch});

const AppProvider: FC = (props) => {

    const [state, dispatch] = useReducer(appReducer, initialState);

    /**
     * dispatcher actions.
     */

    const action = useMemo(() => {
        return {
            dialogAction: (data: IDialogPayload) => {
                dispatch({type: "dialog", payload: data})
            },

            emitterAction: (data: TEmitterProp) => {              
               dispatch({type: "emitter", payload: data});
            }
        };
    }, []);

    return (
        <AppContext.Provider value={{ state, action }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider;
