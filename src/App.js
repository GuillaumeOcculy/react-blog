import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { AuthContextProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
}

export default App;
