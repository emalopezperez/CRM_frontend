import React, { useState, useEffect } from "react";

export const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");

      await logear(token);

    })();
  }, []);

  const logear = async (token) => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem("token", token);
      }
  
      setToken(token);
      setUser(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    setToken(false);
    setUser(false);
  };

  const data = {
    user,
    token,
    logear,
    logout,
  };

  return (
    <AuthContext.Provider value={{ data }}>
      {props.children}
    </AuthContext.Provider>
  );
}
