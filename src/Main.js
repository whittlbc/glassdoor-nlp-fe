import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';

class Main extends Component {

  constructor(props) {
    super(props);

    this.getRoutes = this.getRoutes.bind(this);

    this.routes = [
      {
        path: '/',
        comp: Home,
        exact: true
      }
    ];
  }

  getRoutes() {
    return this.routes.map((route, i) => {
      if (route.exact) {
        return <Route key={i} exact path={route.path} component={route.comp} />;
      } else {
        return <Route key={i} path={route.path} component={route.comp} />;
      }
    });
  }

  render() {
    return (
      <main>
        <Switch>
          {this.getRoutes()}
          <Redirect to='/' />
        </Switch>
      </main>
    );
  }
}

export default Main;