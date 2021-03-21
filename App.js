import React from 'react';
import { Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from "react-router-native";

import GlobalState from "./global-state";

import LoginPage from './Screens/LoginPage';

export default function App() {
  return (
    <GlobalState>
      <NativeRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          {/*<Route exact path='/welcome' component={WelcomePage} />
          {/*<Route exact path='/routelist' component={RouteListPage} />}
          <Route exact path='/route' component={RoutePage} />
          <Route exact path='/completed' component={CompletedPage} />*/}
        </Switch>
      </NativeRouter>
    </GlobalState>
  );
}
