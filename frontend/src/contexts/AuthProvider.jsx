import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import { toast } from 'sonner'
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AUTH_STATUS = {
  UNAUTHENTICATED: "El usuario no se encuentra autenticado", 
  AUTHENTICATED: "Inicio de sesión exitoso",
  UNAUTHORIZED: "Usuario y/o contraseña incorrecto/s",
  INTERNAL_ERROR:
    "Ha ocurrido un error interno, intente de nuevo. En caso de persistir comuniquese con un administrador",
};

const LOGOUT_STATUS = {
  SUCCESS: "Sesión cerrada exitosamente",
  FAILED: "Algo ha salido mal, vuelve a intentarlo",
  INTERNAL_ERROR: "Ha ocurrido un error interno, intente de nuevo. En caso de persistir comuniquese con un administrador"
}

export const AuthProvider = ({ children }) => {
  const [cookies,setCookie, removeCookie] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userBasic, setUserBasic] = useState({});

  useEffect(() => {
    if(cookies.access_token){
      getUserBasicFromToken(cookies.access_token)
    }
  }, [cookies])

  const getUserBasicFromToken = async (access_token) => {
    try {
      //const decodedPayload = jwtDecode(access_token);
      // setUserBasic(decodedPayload);
    } catch (err) {
      console.log("Error Parsing Token, verify token's authenticity");
    }
  };

  const login = async (username, password) => {
    try {
      const loginData = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const loginDataJSON = await loginData.json();
      // CHECK RESPONSE CONTAINS ACCESS TOKEN
      if(loginDataJSON.success) {
        setIsAuthenticated(true)
        toast.success(AUTH_STATUS.AUTHENTICATED)
        return [true, AUTH_STATUS.AUTHENTICATED];
      } else {
        return [false, AUTH_STATUS.UNAUTHORIZED];
      }

    } catch (err) {
      return [false, AUTH_STATUS.INTERNAL_ERROR];
    }
  };

  const logout = async() => {
    const logoutData = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    });
    const logoutDataJSON = await logoutData.json();
    console.log(logoutDataJSON.success);
    if(logoutDataJSON.success) {
      setIsAuthenticated(false)
      toast.success(LOGOUT_STATUS.SUCCESS)
      return true
    } else if (logoutDataJSON.message) {
      toast.error(LOGOUT_STATUS.FAILED)
      return false
    }
    toast.error(LOGOUT_STATUS.INTERNAL_ERROR)
    return false
  };

  return (
    <AuthContext.Provider value={{ userBasic, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
