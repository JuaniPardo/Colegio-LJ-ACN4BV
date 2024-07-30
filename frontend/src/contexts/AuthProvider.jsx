import { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from 'react-cookie'
import { jwtDecode } from "jwt-decode";

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

export const AuthProvider = ({ children }) => {
  const [cookies,setCookie, removeCookie] = useCookies(['access_token']);
  const [accessToken, setAccessToken] = useState("");
  const [userBasic, setUserBasic] = useState({});

  useEffect(() => {
    if(cookies.access_token){
      setAccessToken(cookies.access_token)
      getUserBasicFromToken(cookies.access_token)
    }
  }, [cookies])

  const getUserBasicFromToken = async (access_token) => {
    try {
      const decodedPayload = jwtDecode(access_token);
      setUserBasic(decodedPayload);
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
      if (!loginDataJSON.access_token) {
        return [false, AUTH_STATUS.UNAUTHORIZED];
      }
      setCookie('access_token', loginDataJSON.access_token)
      return [true, AUTH_STATUS.AUTHENTICATED];
    } catch (err) {
      return [false, AUTH_STATUS.INTERNAL_ERROR];
    }
  };

  const logout = () => {
    removeCookie('access_token')
  };

  return (
    <AuthContext.Provider value={{ userBasic, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
