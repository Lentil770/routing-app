import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from "react-router-native";

import GlobalState from "./global-state";

import LoginPage from './Screens/LoginPage';
import HomePage from './Screens/HomePage';
import RouteContainer from './Screens/RouteContainer';
import EndPage from './Screens/EndPage';

//add functionality to display login if X logged in, else HomePage
export default function App() {
  return (
    <GlobalState>
      <NativeRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route exact path='/home' component={HomePage} />
          {/*<Route exact path='/routelist' component={RouteListPage} />*/}
          <Route exact path='/route-container' component={RouteContainer} />
          <Route exact path='/end' component={EndPage} />
        </Switch>
      </NativeRouter>
    </GlobalState>
  );
}
