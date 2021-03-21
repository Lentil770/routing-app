import React from 'react';
import { View, StatusBar, Text, ActivityIndicator } from 'react-native';
import Context from "../user-context";

class LoginPage extends React.Component {
  state = {
      loading: true
  };

  static contextType = Context;
  
  componentDidMount() {
    fetch('https://allin1ship.herokuapp.com/getAccounts')
    .then(response => {
      if(!response.ok) {
          throw new Error()
      }
      return response.json()
    }).then(json => this.setState({accounts: json, loading: false}, console.log('response, ', json)))
    .catch(err => console.log('error in fetchplatforms', err))
  }

  render() {

    if (this.state.loading) {
        return <View> 
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    }

    return (
        <View>
            <StatusBar style="auto" />
            <Text>Login</Text>
        </View>
    );
  }
}
export default LoginPage;
