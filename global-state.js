import React from "react";
import Context from './user-context';

/*this file is storing global data for app (stop information) (username and password which actually want to change to AsyncStorage)
using Context created in user-context file.
inside this file it is fetching stop data once logged in and storing in state which is passed to all apps components.*/
export default class GlobalState extends React.Component{
state = {
  data: [],
  username: '',
  vehicle: 'defaultVehicle',
  dropoffInfo: 'defaultDroppoffInfo',
  stopTasks: [],
  dataError: false
}

//seperate api call for tasks bc of way they are ordered...
fetchTasks = async (stop_ids) => {
  this.setState({stopTasks: []})
  for (let i=0;i<stop_ids.length;i++) {
    
    try {
    const response = await fetch(`https://allin1ship.herokuapp.com/getDailyTasks/${stop_ids[i]}`)
    const data = await  response.json()
    this.setState({stopTasks: [...this.state.stopTasks, data] })
    } catch (e) {
        console.log('error in fetchtasks')
   }
  }
}
fetchAppData = async () => {
  try {
    const response = await fetch(`https://allin1ship.herokuapp.com/getDailySchedule/${this.state.username}`)
    const data = await response.json()
    if (!data) throw new Error
    this.setState({data, dataError: false})
    await this.fetchTasks(data.map(obj => obj.schedule_stop_id))
  } catch (e) {
      console.log('error occured in try fetch');
      this.setState({dataError: true})
  }
}

updateUsername = (newName) => {
  this.setState({username: newName});
};
 
render(){
 return (
  <Context.Provider 
   value={{
    data: this.state.data,
    dataError: this.state.dataError,
    stopTasks: this.state.stopTasks,
    vehicle: this.state.vehicle,
    dropoffInfo: this.state.dropoffInfo,
    username: this.state.username,
    updateUsername: this.updateUsername,
    fetchAppData: this.fetchAppData
   }}
  >
   {this.props.children}
  </Context.Provider>
 );
 }
}