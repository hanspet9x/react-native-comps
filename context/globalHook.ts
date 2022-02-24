import { useContext } from "react"
import { GlobalContext } from "../../contexts/globalContext"

export const useAuth = () => {
    const {state: {isAuth}, actions: {setAuth}} = useContext(GlobalContext);

    return  {isAuth, setAuth}
}