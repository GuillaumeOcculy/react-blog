import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Post from "./pages/Post";
import { AuthContextProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />

        <div className="ui container" style={{ marginTop: "100px" }}>
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

            <Route exact path="/profile">
              <Profile />
            </Route>

            <Route exact path="/posts/:post_id">
              <Post />
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
