import Home from './pages/chat';
import Login from './pages/login';
import Register from "./pages/register"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./config/firebase"
import Pagenotfound from './pages/pagenotfound';

function App() {
  const [isAuthenticated] = useAuthState(auth)
  console.log(isAuthenticated)

  return (
    <Router>
      <Switch>
        {isAuthenticated !== null ?
          <Route exact path="/home" component={Home} /> :
          <>
            <Route exact path="/" component={Register} />
            <Route exact path="/login" component={Login} />
            {/* <Route path="*" component={Pagenotfound} /> */}
          </>}
      </Switch>
    </Router>
  )
}

export default App;
