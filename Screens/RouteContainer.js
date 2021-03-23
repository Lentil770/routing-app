import React from 'react';
import { ToastAndroid } from 'react-native';

import StopPage from './StopPage';
import EndPage from "./EndPage";
import Context from '../user-context';

class RouteContainer extends React.Component {
  state={
    pageNumber: 1
  }

  static contextType = Context;

  componentDidMount() {
    //in order to load correct page if in middle of route (so driver X repeat stops)
    console.log('routeconntainer mounted');
    let skipToPage = 1;
    for (let i=0;i<this.context.data.length;i++) {
      if (this.context.data[i]['completion_status'] === 'complete') {
        skipToPage ++
      }
    }
    this.setState({pageNumber: skipToPage})
  }

  //functions to swipe to nex / previous page by setting state pagenumber => rerendering new page
  nextPage = (complete, dbComplete) => {
    //check if stop complete and show message if not (in case swipe by mistake)
    if (!complete && !dbComplete) {
      console.log('incomplete', complete);
      ToastAndroid.showWithGravity(` PREVIOUS STOP INCOMPLETE.${'\n'}Are you sure you want to continue?`, ToastAndroid.LONG, ToastAndroid.CENTER);
    }
    this.setState({pageNumber: this.state.pageNumber + 1})
  }
  prevPage = () => {
    console.log('prevpage', this.state);
    if (this.state.pageNumber === 1) {
      this.props.history.push('/home')
    }
    this.setState({pageNumber: this.state.pageNumber - 1})
  }

  render() {
      const contextData = this.context.data;
      console.log('routecontainer reder: thisstate.pagenumner: ', this.state.pageNumber);
      if (this.state.pageNumber>contextData.length) { 
        return <EndPage prevPage={this.prevPage} />
      } else {
        return <StopPage 
          pageNumber={this.state.pageNumber} 
          nextPage={this.nextPage} prevPage={this.prevPage} 
          />
      }
    }
  }
export default RouteContainer;