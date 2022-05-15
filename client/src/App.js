import React from 'react';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "./index.css";

// Pages
import NoMatchPage from "./pages/NoMatchPage";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Create from "./pages/Create/Create";
import Landing from './pages/Landing/Landing';
import Discover from './pages/Discover/Discover';
import Trip from './pages/Trip.js/Trip';
import Profile from "./pages/Profile/Profile";


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/create/:id" component={Create} />
        <Route exact path="/discover" component={Discover} />
        <Route exact path="/trip/:id" component={Trip} />
        <Route exact path="/" component={Landing} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
