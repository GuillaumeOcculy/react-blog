import React, { createContext, useState } from "react";
import MOT from "../apis/MOT";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);

  function setAuthToken(data) {
    localStorage.setItem("token", data);
    setToken(data);
    MOT.defaults.headers.common["Authorization"] = `Bearer ${data}`;
  }

  function removeAuthToken() {
    localStorage.removeItem("token");
    setToken();
  }

  return (
    <AuthContext.Provider
      value={{ authToken: token, setAuthToken, removeAuthToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthContextProvider };
