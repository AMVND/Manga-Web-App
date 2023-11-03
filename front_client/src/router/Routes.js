import React from 'react'
import { Route, Switch } from "react-router-dom";
import Home from '../components/page/Home';
import BoardAdmin from '../components/page/BoardAdmin';
import BoardModerator from '../components/page/BoardModerator';
import BoardUser from '../components/page/BoardUser';
import Profile from '../components/page/Profile';
import Register from '../components/login/Register';
import Login from '../components/login/Login';
import NoFoundPage from '../components/page/NoFoundPage';


export default function Routes() {
  return (
    <Switch>
      <Route exact path={["/", "/home"]} component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/profile" component={Profile} />
      <Route path="/user" component={BoardUser} />
      <Route path="/mod" component={BoardModerator} />
      <Route path="/admin" component={BoardAdmin} />
      <Route path="*" component={NoFoundPage} />
    </Switch>
  )
}