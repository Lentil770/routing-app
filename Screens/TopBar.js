import React from "react";
import { Text, View, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Context from '../user-context';

import { TopBarText } from "../styles/text";


export default function TopBar() {

    return(
        <Context.Consumer>
            { context => (
            <View >
                <StatusBar style='auto' />
                <Image style={{ height: 35, width: 120}} source={require('../assets/allin1ship-logo.png')} />  
                <TopBarText >Hello, {context.username}</TopBarText>
            </View> )}
        </Context.Consumer>
    )
}