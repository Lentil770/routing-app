import React from "react";
import { View } from "react-native";
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
        fetch('https://allin1ship.herokuapp.com/getFeedbackOptions')
        .then(response => response.json())
        .then(json => this.setState({feedbackOptions: json}))
        .then(() => this.setFeedbackState())
        this.setTasksState();
    }

    
    setFeedbackState = () => {
        const { feedbackOptions } = this.state;
        for (let i=0;i<feedbackOptions.length;i++) {
            this.setState({[`feedback${i}`]: false})
        }
    }

    setTasksState = () => {
        const { stopTasks } = this.props;
        for (let i=0;i<stopTasks.length;i++) {
            this.setState({[`task${stopTasks[i].task_id}`]: false})
        }
    }

    onFeedbackChange = (newFeedback) => {
        this.setState({feedback: newFeedback})
    }

    
    packageNumberSubmit = () => {
        fetch(`https://allin1ship.herokuapp.com/sendPackageNumber/${this.props.stopData.schedule_stop_id}/${this.state.numberPackages}`)
           .then(response => {
             if (response.ok) {
               console.log('package number submited ok!');
             } else {
             throw new Error
             }
           })
           .catch(err => console.log('error in sending packageNumber', err))
    }

    postCompletionStatus = () => {
                fetch(`https://allin1ship.herokuapp.com/markCompletionStatus/${this.props.stopData.schedule_stop_id}`)
           .then(response => {
             if (response.ok) {
               console.log('post completions status response ok!');
             } else {
             throw new Error
             }
           })
           .catch(err => console.log('error in sending packageNumber', err))
    }

    onfeedbackSubmit = () => {
        let feedbackToSend = [this.state.feedback]
        for (let i=0;i<this.state.feedbackOptions.length;i++) {
            if (this.state[`feedback${i}`]) {
            feedbackToSend.push(this.state.feedbackOptions[i])
            }
        }
        feedbackToSend = feedbackToSend.join()
        fetch(`https://allin1ship.herokuapp.com/sendFeedback/${this.props.stopData.schedule_stop_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({feedback: feedbackToSend})
        })
        .then(response => {
            if (response.ok) {
                console.log('feedback successfully submitted');
            } else {
                throw new Error;
            }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    tasksSubmit = () => {
        const { stopTasks } = this.props;
        for (let i=0;i<stopTasks.length;i++) {
            if (this.state[`task${stopTasks[i].task_id}`]) {
            fetch(`https://allin1ship.herokuapp.com/markTaskComplete/${stopTasks[i].task_id}`)
           .then(response => {
             if (response.ok) {
               console.log('tasksubmit response ok!');
             } else {
             throw new Error
             }
           })
           .catch(err => console.log('error in sending task', err))
        } else {
            fetch(`https://allin1ship.herokuapp.com/markTaskIncomplete/${stopTasks[i].task_id}`)
           .then(response => {
             if (response.ok) {
               console.log('mark incomplete response ok!');
             } else {
             throw new Error
             }
           })
        }
        }
    }
 
    
    handleSubmit = () => {
        this.tasksSubmit()
        this.onfeedbackSubmit()
        this.packageNumberSubmit()
        this.props.completeStop()
        this.postCompletionStatus()
        this.props.closeModal()
    }


    _handleClick(flag, button, numberPackages) {
      if (flag == 1) {
        this.setState({selected: true});
      }
      this.setState({SelectedButton: button, numberPackages, feedbackPackagesSelected: this.state.feedbackSelected && true})
    }

    handleCheck = (stateReference) => {
      this.setState(prevState => ({
          [stateReference]: !prevState[stateReference]
    }))}

    handleFeedback = (feedback, index) => {
        this.setState({feedbackSelected: true})
        this.setState(prevState => ({
            [`feedback${index}`]: !prevState[`feedback${index}`]
          })
        )
    }

    handleFeedbackInput = (feedback) => {
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

    const tasksDisplay2 = stopTasks && stopTasks.map((task) => <TaskButton
            onPress={() => this.handleCheck(`task${task.task_id}`)}
            style={{backgroundColor: (this.state[`task${task.task_id}`]? Orange : Lavender)}}
            underlayColor={Orange}>
                <BtnText>{task.task}</BtnText>
            </TaskButton>
    )
    
    return (        
        
          <FeedbackContainer>
              
            <ClosePageButton
              onPress={() => { this.props.onPress() }}>
                <BtnText>X</BtnText>
            </ClosePageButton> 
            
            <MainText style={{position: 'absolute', top: 30}}>{stopData.customer_name}</MainText>
     
            <TaskCompletionContainer>
              <LineText>TASKS</LineText>
              <MainText>MARK TASKS COMPLETE</MainText>
              {stopTasks && tasksDisplay2}
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
                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '1' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '1', '0')}
                  underlayColor={Orange}>
                      <BtnText>0</BtnText>
                </PackageButton>

                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '2' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '2', '1-5')}
                  underlayColor={Orange}>
                  <BtnText>
                      1-5
                  </BtnText>
                </PackageButton>

                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '3' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '3', '6-10')}
                  underlayColor={Orange}>
                  <BtnText>
                      6-10
                  </BtnText>
                </PackageButton>

                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '4' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '4', '11-15')}
                  underlayColor={Orange}>
                  <BtnText>
                      11-15
                  </BtnText>
                </PackageButton>

                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '5' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '5', '16-20')}
                  underlayColor={Orange}>
                  <BtnText>
                      16-20
                  </BtnText>
                </PackageButton>

                <PackageButton
                  style={{backgroundColor: (this.state.SelectedButton === '6' ? Orange : Lavender)}}
                  onPress={() => this._handleClick('any flag', '6', '21-25')}
                  underlayColor={Orange}>
                  <BtnText>
                      20+
                  </BtnText>
                </PackageButton>
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

