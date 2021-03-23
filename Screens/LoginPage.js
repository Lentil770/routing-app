import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Alert, ActivityIndicator } from 'react-native';

import Context from "../user-context";

import { BtnText, PasswordText } from "../styles/text";
import { LoginContainer } from "../styles/screens.js";
import { LoginButton, PasswordInput } from '../styles/buttons';
import { CenteredView } from '../styles/misc';

class LoginPage extends React.Component {
  state = {
      loading: true
  };

  static contextType = Context;
  
  componentDidMount() {
    /*want to add functionality to keep user logged in maybe.
    if (this.context.getUsername()) {
        this.props.history.push('/home')
    }*/
    fetch('https://allin1ship.herokuapp.com/getAccounts')
    .then(response => {
      if(!response.ok) {
          throw new Error()
      }
      return response.json()
    }).then(json => this.setState({accounts: json, loading: false}))
    .catch(err => console.log('error in fetchplatforms', err))
  }

  onButtonPress = () => {
    const driverAccount = this.state.accounts && this.state.accounts.find(account =>  account.password === this.state.password)
    if (driverAccount) {
      
      this.context.updateUsername(driverAccount.username)
      this.props.history.push('/home')
    } else{
      Alert.alert('error', 'your password is incorrect. please try again')
    }
  }

  render() {

    if (this.state.loading) {
      //renders loading symbol until accoutns are loaded to avoid error messages on correct passwords
        return <CenteredView> 
            <ActivityIndicator size="large" color="#ffffff" />
        </CenteredView>
    }

    return (
        <LoginContainer>
            <StatusBar style="auto" />
            <Image style={{ height: 85, width: 300, borderRadius: 26, bottom: 80}} source={require('../assets/allin1ship-logo.png')} />  
            <PasswordText>Password:</PasswordText>
            <PasswordInput
            secureTextEntry={true}
            placeholder='****'
            keyboardType='numeric'
            value={this.state.password}
            onChangeText={(text) => this.setState({password: text})}
            >
            </PasswordInput>
            <LoginButton onPress={this.onButtonPress}>
            <BtnText>SIGN ME IN</BtnText>
            </LoginButton>
        </LoginContainer>
    );
  }
}
export default LoginPage;
