import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from "react-router-native";

import GlobalState from "./global-state";

import LoginPage from './Screens/LoginPage';
import HomePage from './Screens/HomePage';
import RouteContainer from './Screens/RouteContainer';
import EndPage from './Screens/EndPage';

//Root Component adding react router functionality for page navigation.
export default function App() {
  //add func here to check if username exists, if yes display homepage.
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
