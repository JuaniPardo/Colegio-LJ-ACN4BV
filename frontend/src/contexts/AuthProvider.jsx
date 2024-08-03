import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'sonner'
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AUTH_STATUS = {
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

export const AuthProvider = ({ children, loadUser }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshData = await fetch("http://localhost:3000/api/token/refresh", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include"
        });
        const refreshDataJSON = await refreshData.json();
  
        // CHECK RESPONSE CONTAINS ACCESS TOKEN
        if(refreshDataJSON.success) {
          setIsAuthenticated(true)
          await getUserData()
        }
      } catch (err) {
        return
      }
      loadUser()
    }
    refreshToken()
    setInterval(() => {
      refreshToken()
    }, 1000 * 60 * 30)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserData = async () => {
    try {
      const basicData = await fetch("http://localhost:3000/api/user-info", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include"
      });
      const basicDataJSON = await basicData.json();
      if(basicDataJSON.success) {
        setUserData(basicDataJSON.data)
      }
    } catch (err) {
      throw new Error("Error getting user basic data");
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
        await getUserData()
        toast.success(AUTH_STATUS.AUTHENTICATED, { duration: 1500 })
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
    if(logoutDataJSON.success) {
      setIsAuthenticated(false)
      toast.success(LOGOUT_STATUS.SUCCESS, { duration: 1500 })
      return true
    } else if (logoutDataJSON.message) {
      toast.error(LOGOUT_STATUS.FAILED, { duration: 1500 })
      return false
    }
    toast.error(LOGOUT_STATUS.INTERNAL_ERROR, { duration: 1500 })
    return false
  };

  return (
    <AuthContext.Provider value={{ userData, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
