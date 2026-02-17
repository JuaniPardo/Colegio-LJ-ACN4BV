import { createContext, useContext, useState } from "react"

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const login = (userType) => {
        setUser({
            nombre: "Lucas",
            apellido: "Caraballo",
            type: userType
        });
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
