import React from 'react';
import { StatusBar } from 'react-native';
import { BackButton } from '../styles/buttons';
import { RouteContainer } from '../styles/screens';
import { MainText, BtnText } from '../styles/text';
import TopBar from './TopBar';
import Context from '../user-context';

const LightSeaGreen = '#8DD4CF';
const Orange = '#F9972Cff';

class StopPage extends React.Component {
  state={
    routeComplete: false,
    showFeedbackPage: false
  }
  
  static contextType = Context;

  render() {
    const { props, state } = this;
    const { data, stopTasks } = this.context;

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


        <BackButton onPress={props.prevPage}><BtnText>back</BtnText></BackButton>
        <BackButton onPress={props.nextPage}><BtnText>next</BtnText></BackButton> 
        <MainText>Stop Page number {props.pageNumber} </MainText>
      </RouteContainer>    )
  }

}

export default StopPage;