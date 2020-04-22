import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProfileFriends from "./pages/ProfileFriends";
import ProfileMessages from "./pages/ProfileMessages";
import ProfileMessageNew from "./pages/ProfileMessageNew";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Post from "./pages/Post";

import { AuthContextProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import { FriendsContextProvider } from "./contexts/FriendsContext";
import { MessagesContextProvider } from "./contexts/MessagesContext";

function App() {
  return (
    <AuthContextProvider>
      <FriendsContextProvider>
        <MessagesContextProvider>
          <Router>
            <Navbar />

            {/* <div className="ui container" style={{ marginTop: "100px" }}> */}
            <div className="ui container">
              <Switch>
                <Route exact path="/about" component={About} />

                <Route exact path="/signup" component={SignUp} />

                <Route exact path="/signin" component={SignIn} />

                <Route exact path="/profile" component={Profile} />

                <Route exact path="/posts/:post_id" component={Post} />

                <Route exact path="/@:username" component={Profile} />

                <Route
                  exact
                  path="/@:username/friends"
                  component={ProfileFriends}
                />

                <Route
                  exact
                  path="/@:username/messages"
                  component={ProfileMessages}
                />

                <Route
                  exact
                  path="/@:username/messages/new"
                  component={ProfileMessageNew}
                />

                <Route exact path="/" component={Home} />
              </Switch>
            </div>
          </Router>
        </MessagesContextProvider>
      </FriendsContextProvider>
    </AuthContextProvider>
  );
}

export default App;
