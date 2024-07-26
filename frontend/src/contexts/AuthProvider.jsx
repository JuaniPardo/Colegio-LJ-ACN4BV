import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AUTH_RESPONSE_MESSAGE = {
  OK: "LOGIN SUCCESSFUL",
  FAIL: "LOGIN FAILED",
};

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState();
  const [user, SetUser] = useState({})

  const syncUserWithToken = async () => {

  }

  const login = async (username, password) => {
    let responseMessage = null;
    const loginData = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    await loginData
      .json()
      .then((data) => {
        if (!data.access_token) {
          responseMessage = AUTH_RESPONSE_MESSAGE.FAIL;
          return;
        }
        setAccessToken(data.access_token);
        responseMessage = AUTH_RESPONSE_MESSAGE.OK;
      })
      .catch((err) => {
        responseMessage = AUTH_RESPONSE_MESSAGE.FAIL;
      });
    return responseMessage;
  };

  const logout = () => {
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
