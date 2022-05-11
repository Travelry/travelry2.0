import React from 'react';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./index.css";

// Pages
import NoMatchPage from "./pages/noMatchPage";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Home from "./pages/Home/home";
import Account from "./pages/Account/account";
import Landing from './pages/Landing/Landing';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <Route exact path="/" component={Landing} />
        <Route path="/home/:location" component={Home} />
        <Route path="/home" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
