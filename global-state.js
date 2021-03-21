import React from "react";
import Context from './user-context';
import AsyncStorage from '@react-native-community/async-storage';
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
  dataError: false,
  loading: true/*
  INCORPORATE FUNCTIONALITY TO SET LAODING FALSE ONCE DATA FETCHED.*/
}

//seperate api call for tasks bc of way they are ordered...
fetchTasks = async (stop_ids) => {
  this.setState({stopTasks: []})
  for (let i=0;i<stop_ids.length;i++) {
    
    try {
    const response = await fetch(`https://allin1ship.herokuapp.com/getDailyTasks/${stop_ids[i]}`)
    const data = await  response.json()
    console.log('fetched stop tasks');
    this.setState({stopTasks: [...this.state.stopTasks, data], loading: false })
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
    console.log('fetchappdata end, now setting loading false', data);
    this.setState({loading: false})
  } catch (e) {
      console.log('error occured in try fetch');
      this.setState({dataError: true, loading: false})
  }
}

updateUsername = async (username) => {
    //on correct login from loginpage, it calls this func to (prev set name in global state/context) set username in asyncstorage to keep user logged in.?
  this.setState({username: username});
  try {
    await AsyncStorage.setItem('username', username)
    console.log(username, 'updateusername asyncstorage');
  } catch (e) {
    console.log('error saving username');
  }
};
/*
getUsername = async () => {
    //check if username is already in AsyncStorage (in order to enable saved login etc.)
    try {
      const username = await AsyncStorage.getItem('username')
      if(username !== null) {
        //console.log(username, 'gotusername successfully');
        this.setState({username})
        return true
      } else {
        return false
      }
    } catch(e) {
      // error reading value
    }
}
*//*
logout = () => {
    //not currently used, to implement a logout button on homepage
    AsyncStorage.removeItem('username')
    this.setState({username: null})
}*/

render(){
 return (
  <Context.Provider 
   value={{
    loading: this.state.loading,
    data: this.state.data,
    dataError: this.state.dataError,
    stopTasks: this.state.stopTasks,
    vehicle: this.state.vehicle,
    dropoffInfo: this.state.dropoffInfo,
    username: this.state.username,
    getUsername: this.getUsername,
    updateUsername: this.updateUsername,
    logout: this.logout,
    fetchAppData: this.fetchAppData
   }}
  >
   {this.props.children}
  </Context.Provider>
 );
 }
}