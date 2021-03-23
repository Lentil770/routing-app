import React from "react";
import { Image } from "react-native";
import { StatusBar } from 'expo-status-bar';

import Context from '../user-context';

import { TopBarText } from "../styles/text";
import { TopBarView } from "../styles/screens"

export default function TopBar() {
//rendering the bar on top of each page - with logo and hello username
    return(
        <Context.Consumer>
            { context => (
            <TopBarView >
                <StatusBar style='auto' />
                <Image style={{ height: 35, width: 120}} source={require('../assets/allin1ship-logo.png')} />  
                <TopBarText >Hello, {context.username}</TopBarText>
            </TopBarView> )}
        </Context.Consumer>
    )
}