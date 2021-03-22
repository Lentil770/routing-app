import React from 'react';
import { StatusBar } from 'react-native';
import { Link } from "react-router-native";

import * as Linking from 'expo-linking';

import TopBar from './TopBar';
import Context from '../user-context';

import { WazeImage, CompletedImage } from '../styles/images';
import { MainButton, WazeButton, BackButton, ClosePageButton, ButtonGroup, CheckInButton } from '../styles/buttons';
import { AddressInfoWrapper, RouteContainer } from '../styles/screens';
import { MainText, BtnText, PageNumber, CustomerText, AddressText, DisplayText } from '../styles/text';

const LightSeaGreen = '#8DD4CF';
const Orange = '#F9972Cff';
const DarkBlue = '#0B3954';
const Lavender = '#7B506F';

class StopPage extends React.Component {
  state={
    routeComplete: false,
    showFeedbackPage: false
  }
  
  static contextType = Context;

  handleCheckIn = () => {
    console.log('handlecheckin clicked');
  }

  handleWazePress = () => {
    const wazeAddress = encodeURIComponent(this.context.data[this.props.pageNumber-1].address)
    console.log(wazeAddress);
    Linking.openURL('https://waze.com/ul?q=' + wazeAddress) 
  };
  dialCall = () => {
    const phoneNumber = `tel:${this.context.data[this.props.pageNumber-1]['contact_number']}`;
    Linking.openURL(phoneNumber);
  };

  render() {
    const { props, state, context } = this;
    const { data, stopTasks } = context;
    console.log(context);
    const stopData = data[props.pageNumber-1]
    console.log('stopdata', stopData);

    return (
      <RouteContainer style={{backgroundColor: (state.routeComplete ? LightSeaGreen : Orange)}}>
        <StatusBar style="auto" />
        <TopBar/>

{/*this modal is the feedback page that pops up when check in to stop clicked. driver fills out form and tasks, an don completion should be sent to next page (props.nextPAge, and this.setstate pagecomplete.) 
        <Modal
            animationType='slide'
            visible={state.modalVisible}
            //transparent={true}  //whats the diff? may be not waht i want.
            onRequestClose={() => this.setState({modalVisible: false})}>
            <FeedbackModal routeData={props.deliveryData} stopTasks={props.stopTasks} onPress={() => this.setState({modalVisible: false})} completeStop={() => this.handleCompletion()} />
</Modal>*/}

        {state.routeComplete && <CompletedImage 
          source = {require('../assets/tick.png')} 
          style={{borderRadius: 36}}
        />}
        
        <Link /*style add*/ to="/home"  component={ClosePageButton}><BtnText>home</BtnText></Link> 
        <BackButton onPress={props.prevPage}><BtnText>back</BtnText></BackButton>
        <BackButton onPress={props.nextPage}><BtnText>next</BtnText></BackButton> 
        <PageNumber>{props.pageNumber}/{data.length} </PageNumber>        

        <AddressInfoWrapper style={{backgroundColor: (state.routeComplete ? '#addeda' : '#F68813')}}>
          <CustomerText>{stopData['customer_name']}</CustomerText>
          <AddressText>{stopData.address}</AddressText>
          <MainText>{stopData.location}</MainText>
          <MainText>{/*comments on the customer*/stopData.comments}</MainText>
          {(stopTasks[props.pageNumber-1] && stopTasks[props.pageNumber-1].length>=1) && <MainText>Tasks:</MainText>}
          {/*tasksDisplay*/}
        </AddressInfoWrapper>

        <WazeButton onPress={this.handleWazePress} >
          <WazeImage source={require('../assets/waze-logo.webp')}/>
        </WazeButton>

        <MainButton onPress={this.dialCall} >
            <BtnText>Call {stopData['contact_name']} ({stopData['contact_number']})</BtnText>
        </MainButton>   
             
        <CheckInButton
          style={{backgroundColor: (state.routeComplete ? Lavender : DarkBlue), height: 60}}  
          onPress={this.handleCheckIn}>
            <BtnText style={{fontWeight: 'bold'}}>CHECK IN</BtnText>
        </CheckInButton>

      </RouteContainer>    )
  }

}

export default StopPage;