import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <div className="ui inverted segment">
        <div className="ui inverted secondary menu container">
          <Link to="/" className="item">
            Home
          </Link>
          <Link to="/about" className="item">
            About
          </Link>
          <Link to="/signup" className="item">
            Sign up
          </Link>
        </div>
      </div>

      <div className="ui container">
        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
