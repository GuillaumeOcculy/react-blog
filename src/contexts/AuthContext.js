import React, { createContext, useState } from "react";
import MOT from "../apis/MOT";
import jwt_decode from "jwt-decode";

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

  function decodeToken() {
    const localToken = localStorage.getItem("token");

    return jwt_decode(localToken);
  }

  function currentUserId() {
    const decodedToken = decodeToken();
    const id = decodedToken.sub;

    return id;
  }

  return (
    <AuthContext.Provider
      value={{ authToken: token, setAuthToken, removeAuthToken, currentUserId }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthContextProvider };
