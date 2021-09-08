import React from 'react';
import Home from './pages/chat';
import Login from './pages/login';
import Register from "./pages/register"
import { BrowserRouter as Router, Route} from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "./config/firebase"

function App() {
  const [isAuthenticated] = useAuthState(auth)
  // console.log(isAuthenticated)
  return (
    <Router>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/"  component={Register}/>
      <Route exact path="/login" component={Login}/>
   </Router>
  )
}

export default App;
