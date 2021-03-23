import React from 'react';
import { StatusBar, Modal } from 'react-native';
import { Link } from "react-router-native";

import * as Linking from 'expo-linking';

import TopBar from './TopBar';
import FeedbackPage from './FeedbackPage';
import Context from '../user-context';

import { WazeImage, CompletedImage } from '../styles/images';
import { PhoneButton, WazeButton, BackButton, HomeButton, CheckInButton } from '../styles/buttons';
import { AddressInfoWrapper, RouteContainer } from '../styles/screens';
import { MainText, BtnText, PageNumber, CustomerText, AddressText, DisplayText } from '../styles/text';
import { fetchFunc } from '../Functions/fetchFuncs';
import { NavButtons } from '../styles/misc';

const LightSeaGreen = '#8DD4CF';
const Orange = '#F9972Cff';
const DarkBlue = '#0B3954';
const Lavender = '#7B506F';

class StopPage extends React.Component {
  //routecomplete with pagenumber bc w/o, glitch was setting ALL stops complete
  state={
    [`routeComplete${this.props.pageNumber}`]: false,
    showFeedbackPage: false
  }

  
  static contextType = Context;

  handleCheckIn = () => {
    //send check in timestamp and open feedback page
    this.setState({showFeedbackPage: true});
    fetchFunc(`https://allin1ship.herokuapp.com/sendStartTime/${this.context.data[this.props.pageNumber-1].schedule_stop_id}`, 'send start time')
  }
  
  handleCompletion = () => {
    this.props.nextPage();
    !this.state[`routeComplete${this.props.pageNumber}`] && fetchFunc(`https://allin1ship.herokuapp.com/sendTimestamp/${this.context.data[this.props.pageNumber-1].schedule_stop_id}`, 'complete stop timestamp');
    this.setState({[`routeComplete${this.props.pageNumber}`]: !this.state[`routeComplete${this.props.pageNumber}`]});
  }

  handleWazePress = () => {
    const wazeAddress = encodeURIComponent(this.context.data[this.props.pageNumber-1].address)
    Linking.openURL('https://waze.com/ul?q=' + wazeAddress) 
  };
  dialCall = () => {
    const phoneNumber = `tel:${this.context.data[this.props.pageNumber-1]['contact_number']}`;
    Linking.openURL(phoneNumber);
  };

  render() {
    const { props, state, context } = this;
    const { data } = context;
    const stopData = data[props.pageNumber-1]
    const stopTasks = context.stopTasks[props.pageNumber-1]
    //wont allow setState routecomplte true in render bc of max depth... so instead this checks if stop already complete (on app load in middl eof route... so drivers dont repeat stops) and true (=> conditional complete comps renderinga as completed) if yes.
    const completionStatus = data[props.pageNumber-1]['completion_status'] === 'complete' ? true : this.state[`routeComplete${props.pageNumber}`];
    
    const tasksDisplay = stopTasks && stopTasks.map((task, index) => 
      <MainText key={index}>- {task.task}</MainText>
    )
   
    return (
      <RouteContainer style={{backgroundColor: (state[`routeComplete${this.props.pageNumber}`] ? LightSeaGreen : Orange)}}>
        <StatusBar style="auto" />
        <TopBar/>

{/*this modal is the feedback page that pops up when check in to stop clicked. driver fills out form and tasks, an don completion should be sent to next page (props.nextPAge, and this.setstate pagecomplete.) */}
        <Modal
            animationType='slide'
            visible={state.showFeedbackPage}
            onRequestClose={() => this.setState({showFeedbackPage: false})}>
            <FeedbackPage 
              pageNumber={this.props.pageNumber} 
              stopData={stopData}
              stopTasks={stopTasks}
              closeModal={() => this.setState({showFeedbackPage: false})}
              completeStop={this.handleCompletion}
            />
        </Modal>

        {completionStatus && <CompletedImage 
          source = {require('../assets/tick.png')} 
          style={{borderRadius: 36}}
        />}
        <NavButtons>
          <BackButton onPress={props.prevPage}><BtnText>back</BtnText></BackButton>
          <Link /*style add*/ to="/home"  component={HomeButton}><WazeImage source={require('../assets/home-page.jpg')} /></Link> 
          <BackButton onPress={() => props.nextPage(this.state[`routeComplete${props.pageNumber}`], completionStatus)}><BtnText>next</BtnText></BackButton> 
        </NavButtons>
        
        <PageNumber>{props.pageNumber}/{data.length} </PageNumber>        

        <AddressInfoWrapper style={{backgroundColor: (completionStatus ? '#addeda' : '#F68813')}}>
          <CustomerText>{stopData['customer_name']}</CustomerText>
          <AddressText>{stopData.address}</AddressText>
          <MainText>{stopData.location}</MainText>
          <MainText>{/*comments on the customer*/stopData.comments}</MainText>
          {(stopTasks && stopTasks.length>=1) && <MainText>Tasks:</MainText>}
          {tasksDisplay}
        </AddressInfoWrapper>

        <WazeButton onPress={this.handleWazePress} >
          <WazeImage source={require('../assets/waze-logo.webp')}/>
        </WazeButton>

        <PhoneButton onPress={this.dialCall} >
            <BtnText>Call {stopData['contact_name']} ({stopData['contact_number']})</BtnText>
        </PhoneButton>   
             
        <CheckInButton
          style={{backgroundColor: (completionStatus ? Lavender : DarkBlue), height: 60}}  
          onPress={this.handleCheckIn}>
            <BtnText style={{fontWeight: 'bold'}}>CHECK IN</BtnText>
        </CheckInButton>

      </RouteContainer>    )
  }

}

export default StopPage;