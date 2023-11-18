import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Home from '../pages/Home'
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadinIndicator from '../common/LoadinIndicator';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants/index';
import PrivateRoute from '../common/PrivateRoute';
import MangaDetails from '../manga/MangaDetails';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false
        });
        
      }).catch(error => {
        this.setState({
          loading: false
        });
      });
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    // Alert.success("You're safely logged out!");
  }

  componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if (this.state.loading) {
      return <LoadinIndicator />
    }

    return (
      <div className="bg-white rounded-lg flex flex-col mx-auto bg-white rounded-lg flex justify-center w-full h-full">
          <Navbar authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser} className="sticky top-0 "/>
        <div className="flex items-center justify-center w-full px-0">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/manga/:mangaId" component={MangaDetails} />
            <PrivateRoute path="/profile" authenticated={this.state.authenticated} currentUser={this.state.currentUser}
              component={Profile}></PrivateRoute>
            <Route path="/login"
              render={(props) => <Login authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App