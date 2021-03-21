import React, { useState } from 'react';
import { View, Text } from 'react-native';

import StopPage from './StopPage';
import EndPage from "./EndPage";
import Context from '../user-context';

class RouteContainer extends React.Component {
  state={
    pageNumber: 1
  }

  static contextType = Context;

  nextPage = () => {
    this.setState({pageNumber: this.state.pageNumber + 1})
  }

  render() {
      const contextData = this.context.data;
      console.log('contextdatalength', contextData.length);
      console.log('thisstate.pagenumner', this.state.pageNumber);
      if (this.state.pageNumber>contextData.length) { 
        return <EndPage/>
      } else {
        return <StopPage pageNumber={this.state.pageNumber} 
        nextPage={this.nextPage} />
        return <EndPage/>
      }
    }
  }
export default RouteContainer;