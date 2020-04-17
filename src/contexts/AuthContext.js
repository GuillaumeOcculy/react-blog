import React, { createContext, useState } from "react";
import BlogAPI from "../apis/BlogAPI";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const localToken = localStorage.getItem("token");
  const [token, setToken] = useState(localToken);

  function setAuthToken(data) {
    localStorage.setItem("token", data);
    setToken(data);
    BlogAPI.defaults.headers.common["Authorization"] = `Bearer ${data}`;
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

  function currentUserUsername() {
    const decodedToken = decodeToken();
    const username = decodedToken.username;

    return username;
  }

  return (
    <AuthContext.Provider
      value={{
        authToken: token,
        setAuthToken,
        removeAuthToken,
        currentUserId,
        currentUserUsername,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export { AuthContext, AuthContextProvider };
