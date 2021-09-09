import React from 'react';
import Home from './pages/chat';
import Login from './pages/login';
import Register from "./pages/register"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./config/firebase"

function App() {
  const [isAuthenticated] = useAuthState(auth)
  let authenticated = false
  if (isAuthenticated) {
    authenticated = true
  } else {
    authenticated = false
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  )
}

export default App;
