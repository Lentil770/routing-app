import styled from "styled-components";
import { StatusBar } from "react-native";

const DarkBlue = '#0B3954';
const LightBlue = '#2DB4B4';
const Lavender = '#7B506F';
const LightSeaGreen = '#8DD4CF';
const Orange = '#F9972Cff';

export const LoginContainer = styled.View`
    flex: 1;
    background-color: ${DarkBlue};
    align-items: center;
    justify-content: center;
`

export const PageContainer = styled.View`
    flex: 1;
    background-color: ${LightSeaGreen};
    align-items: center;
    justify-content: center;
`

export const RouteContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const FeedbackContainer = styled.View`
    flex: 1;
    background-color: ${LightSeaGreen};
    align-items: center;
    justify-content: center;
`

export const AddressInfoWrapper = styled.View`
    background-color: #ff9a5c;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 10px;
    `

export const TaskCompletionContainer = styled.View`
    color: white;
`

export const PackageButtonsView = styled.View`
    margin-right: 5px;
    margin-left: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
`

export const TopBarView = styled.View`
    align-self: stretch;
    flex: 1;
    flex-direction: row;
    height: 90px;
    width: 100%;
    position: absolute;
    top: 0;
    background-color: white;
    justify-content: space-between;
    padding-horizontal: 10px;
    padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
`