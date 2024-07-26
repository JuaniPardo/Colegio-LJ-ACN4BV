import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const cookies = new Cookies(null, { path: "/" });

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
  const [accessToken, setAccessToken] = useState();
  // CONTAINS USER BASIC INFO
  const [userBasic, setUserBasic] = useState({});

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
        body: JSON.stringify({ username: username, password: password }),
      });
      const loginDataJSON = await loginData.json();
      // CHECK RESPONSE CONTAINS ACCESS TOKEN
      if (!loginDataJSON.access_token) {
        return [false, AUTH_STATUS.UNAUTHORIZED];
      }
      setAccessToken(loginDataJSON.access_token);
      return [true, AUTH_STATUS.AUTHENTICATED];
    } catch (err) {
      return [false, AUTH_STATUS.INTERNAL_ERROR];
    }
  };

  const logout = () => {
    setAccessToken(null);
    setUserBasic(null);
  };

  useEffect(() => {
    if (accessToken) {
      cookies.set("access_token", accessToken);
      getUserBasicFromToken(accessToken);
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ accessToken, userBasic, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
