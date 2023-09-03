import { createContext, useEffect, useReducer } from "react";
//creating the context
export const AuthContext = createContext();

//context provider
const AuthContextProvider = ({ children }) => {
    //reducer function 
    const authReducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return { user: action.payload }
            case 'LOGOUT':
                return { user: null }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(authReducer, { user: null })
    console.log("Authcontext state: ", state)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        //checks for presence of jwt in local storage 
        if (user) {
            dispatch({ type: "LOGIN", payload: user });
        }
    },[])
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;