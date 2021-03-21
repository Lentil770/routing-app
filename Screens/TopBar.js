import React from "react";
import { View, Image } from "react-native";

import Context from '../user-context';


export default function TopBar() {

    return(
        <Context.Consumer>
            { context => (
            <View >
                <Image style={{ height: 35, width: 120}} source={require('../assets/allin1ship-logo.png')} />  
                <Text >Hello, {context.username}</Text>
            </View> )}
        </Context.Consumer>
    )
}