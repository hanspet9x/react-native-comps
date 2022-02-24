import { useContext } from "react"
import { AppContext } from "../context/globalContext";

export const useEventEmitter = () => {

    const { action: { emitterAction }, state: { emitter } } = useContext(AppContext);

    const on = (eventName: string, callback: (param?: unknown) => void) => {
        common(eventName, callback, true);
    }

    const once = (eventName: string, callback: (param?: unknown) => void) => {
        common(eventName, callback, false);
    }
    const common = (eventName: string, callback: (param?: unknown) => void, persist: boolean) => {
        emitter.set(eventName, {callback, persist});
        emitterAction(emitter);
    }
    
    const emit = (eventName: string, param?: unknown) => {
        if (emitter.has(eventName)) {
            const prop = emitter.get(eventName);
            if(!prop?.persist)emitter.delete(eventName);
            prop?.callback && prop.callback(param);
        }
    }

    return { on, emit, once }
}