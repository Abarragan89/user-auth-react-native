import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: (token) => {},
    logout: () => {}
})

function AuthContextProvider({ children }) {
    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        setAuthToken(token)
        // store token on the device
        // data stored should always be a string(token is already string)
        AsyncStorage.setItem('token', token);
    }

    function logout() {
        setAuthToken(null)
        AsyncStorage.removeItem('token')
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthContextProvider;