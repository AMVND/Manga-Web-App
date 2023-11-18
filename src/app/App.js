import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Home from '../pages/Home'
import NotFound from '../common/NotFound';
import MangaDetails from '../manga/MangaDetails';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className="bg-white rounded-lg flex flex-col mx-auto bg-white rounded-lg flex justify-center w-full h-full">
        <Navbar authenticated={this.state.authenticated} onLogout={this.handleLogout} currentUser={this.state.currentUser} className="sticky top-0 " />
        <div className="flex items-center justify-center w-full px-0">
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/manga/:mangaId" component={MangaDetails} />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App