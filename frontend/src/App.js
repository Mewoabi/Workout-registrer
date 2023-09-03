import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import useAuthContext from "./hooks/useAuth";


function App() {

  const { user } = useAuthContext();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="pages">
          <Switch>
            <Route exact path='/'>
              { user ? <Home /> : <Redirect to='/login' />}
            </Route>
            <Route path='/login'>
              { !user ? <Login /> : <Redirect to='/' /> }
            </Route>
            <Route path='/signup'>
            { !user ? <Signup /> : <Redirect to='/' /> }
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
