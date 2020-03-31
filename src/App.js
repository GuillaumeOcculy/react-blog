import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import AuthContext from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const token = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(token);

  function setToken(data) {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  function removeToken(data) {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  return (
    <AuthContext.Provider
      value={{ authToken, setAuthToken: setToken, removeToken: removeToken }}
    >
      <Router>
        <Navbar />

        <div className="ui container">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Route exact path="/signin">
              <SignIn />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
