import React from "react";
import { View } from "react-native";
import { fetchFunc, postFeedback } from "../Functions/fetchFuncs";
import { SubmitButton, FeedbackInput, PackageButton, ClosePageButton, TaskButton } from "../styles/buttons";
import { FeedbackContainer, TaskCompletionContainer, PackageButtonsView } from "../styles/screens";
import { BtnText, MainText, LineText } from "../styles/text";
import Context from '../user-context';

const DarkBlue = '#0B3954';
const Lavender = '#7B506F';
const Orange = '#F9972Cff';

//this component is the popup modal from each stops page when checkin clicked
//here user needs to select feedback or write own, select how manuy packages
//and select completed tasks.
//complete stop button only shows once feedback and #packages selected.
//longest file bc has most functionality - collects task completion, feedback, custom feedback and package numbers and handles submission of all.
export default class FeedbackPage extends React.Component {
    state = {
        feedback: '',
        selected: null,
        SelectedButton: '',
        checked1: true,
        feedbackOptions: []
    }
    static contextType = Context;

    componentDidMount() {
      //fetches feedback options from state to enable changes in options
        fetch('https://allin1ship.herokuapp.com/getFeedbackOptions')
        .then(response => response.json())
        .then(json => this.setState({feedbackOptions: json}))
        .then(() => this.setFeedbackState())
        this.setTasksState();
    }

    setFeedbackState = () => {
      //self evident what this does, used on submiting feedback to know if feedback exists to add to sent data
        const { feedbackOptions } = this.state;
        for (let i=0;i<feedbackOptions.length;i++) {
            this.setState({[`feedback${i}`]: false})
        }
    }

    setTasksState = () => {
      //sets state for eash task true/false to send completion status of each 
        const { stopTasks } = this.props;
        for (let i=0;i<stopTasks.length;i++) {
            this.setState({[`task${stopTasks[i].task_id}`]: false})
        }
    }

    onfeedbackSubmit = () => {
        let feedbackToSend = [this.state.feedback]
        for (let i=0;i<this.state.feedbackOptions.length;i++) {
            if (this.state[`feedback${i}`]) {
            feedbackToSend.push(this.state.feedbackOptions[i])
            }
        }
        feedbackToSend = feedbackToSend.join()
        postFeedback(`https://allin1ship.herokuapp.com/sendFeedback/${this.props.stopData.schedule_stop_id}`, feedbackToSend)
    }

    tasksSubmit = () => {
        const { stopTasks } = this.props;
        if (!stopTasks) return;
        for (let i=0;i<stopTasks.length;i++) {
            if (this.state[`task${stopTasks[i].task_id}`]) {
            fetchFunc(`https://allin1ship.herokuapp.com/markTaskComplete/${stopTasks[i].task_id}`, 'mark task complete')
        } else {
            fetchFunc(`https://allin1ship.herokuapp.com/markTaskIncomplete/${stopTasks[i].task_id}`, 'mark tast incomplete')
    }}}
    
    handleSubmit = () => {
        this.tasksSubmit()
        this.onfeedbackSubmit()
        fetchFunc(`https://allin1ship.herokuapp.com/sendPackageNumber/${this.props.stopData.schedule_stop_id}/${this.state.numberPackages}`, 'submit package number')
        this.props.completeStop()
        fetchFunc(`https://allin1ship.herokuapp.com/markCompletionStatus/${this.props.stopData.schedule_stop_id}`, 'post completion status')
        this.props.closeModal()
    }

    _handleClick(flag, button, numberPackages) {
      if (flag == 1) {
        this.setState({selected: true});
      }
      this.setState({SelectedButton: button, numberPackages, feedbackPackagesSelected: this.state.feedbackSelected && true})
    }

    handleTaskCheck = (stateReference) => {
      //handles task state completion
      this.setState(prevState => ({
          [stateReference]: !prevState[stateReference]
    }))}

    handleFeedback = (feedback, index) => {
      //handles selection of a generated feedback option btn
        this.setState({feedbackSelected: true})
        this.setState(prevState => ({
            [`feedback${index}`]: !prevState[`feedback${index}`]
          })
        )
    }

    handleFeedbackInput = (feedback) => {
      //handles feedback change from the original user input feedback
        this.setState({feedbackSelected: true})
        this.setState({feedback})
    }


    render() {
    
      const { stopData, stopTasks } = this.props;
      const feedbackOptionsDisplay = this.state.feedbackOptions && this.state.feedbackOptions.map((feedback, index) => 
        <TaskButton
          key={index}
          style={{backgroundColor: (this.state[`feedback${index}`]? Orange : Lavender)}}
          onPress={() => this.handleFeedback(feedback, index)}
          underlayColor={Orange}>
          <BtnText style={{fontSize: 18}}>
              {feedback}
          </BtnText>
        </TaskButton>
      )

      const tasksDisplay = stopTasks && stopTasks.map((task) => <TaskButton
        onPress={() => this.handleTaskCheck(`task${task.task_id}`)}
        style={{backgroundColor: (this.state[`task${task.task_id}`]? Orange : Lavender)}}
        underlayColor={Orange}>
            <BtnText>{task.task}</BtnText>
        </TaskButton>
      )

      const renderPackageButtons = ['0', '1-5', '6-10', '11-15', '16-20', '21+'].map((range, index) => 
        <PackageButton
          style={{backgroundColor: (this.state.SelectedButton === index+1 ? Orange : Lavender)}}
          onPress={() => this._handleClick('any flag', index+1, range)}
          underlayColor={Orange}>
              <BtnText>{range}</BtnText>
        </PackageButton>
      )
    
    return (        
          <FeedbackContainer>
              
            <ClosePageButton
              onPress={this.props.closeModal}>
                <BtnText>X</BtnText>
            </ClosePageButton> 
            
            <MainText style={{position: 'absolute', top: 30}}>{stopData.customer_name}</MainText>
     
            <TaskCompletionContainer>
              <LineText>TASKS</LineText>
              <MainText>MARK TASKS COMPLETE</MainText>
              {stopTasks && tasksDisplay}
            </TaskCompletionContainer>

            <View>
                <LineText>SEND FEEDBACK</LineText>
                {feedbackOptionsDisplay}
     
                <FeedbackInput
                    placeholder='write your own feedback here'
                    multiline={true}
                    numberOfLines={2}
                    onChangeText={(text => this.handleFeedbackInput(text))}
                >
                </FeedbackInput>
            </View>
            
              <PackageButtonsView style={{flexDirection: 'row'}}>   
                <LineText>NUMBER OF PACKAGES</LineText>   
                {renderPackageButtons}           
            </PackageButtonsView>
            
            {this.state.feedbackPackagesSelected && <SubmitButton
                style={{backgroundColor: DarkBlue, position: 'absolute', bottom: 1}}  
                onPress={this.handleSubmit}>
                  <BtnText style={{fontWeight: 'bold'}}>COMPLETE</BtnText>
              </SubmitButton>}
          </FeedbackContainer>        
    )
  }
}

