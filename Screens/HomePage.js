
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Context from '../user-context';
import TopBar from "./TopBar";

import { BtnText, MainText, WelcomeText } from "../styles/text";
import { PageContainer } from '../styles/screens';
import { StartButton } from '../styles/buttons';
import { CenteredView } from '../styles/misc';

class HomePage extends React.Component {
//component renders welcome info to driver and says which vehicle using.
//in future app updates potential for more functionality etc.
    static contextType = Context;

    componentDidMount() {
        this.context.fetchAppData();
        this.timer = setInterval(() => this.context.fetchAppData(), 60000);
    }


    handleStartPress = () => {
        fetch(`https://allin1ship.herokuapp.com/sendScheduleStartTime/${this.context.username}`)
        this.context.data && this.props.history.push('/route-container')
    }

    render() {

        if (this.context.loading) {
            return <CenteredView> 
                <ActivityIndicator size="large" color="#ffffff" />
            </CenteredView>
        }

        const contextData = this.context.data;
        return (
            <PageContainer>
            <StatusBar style="auto" />
            <TopBar />
            {!this.context.dataError ? <View>
                {/*<LoginButton onPress={() => this.context.logout()}>
                    <BtnText>LOGOUT</BtnText>
            </LoginButton>*/}
                <WelcomeText> Welcome{"\n"}{this.context.username}</WelcomeText>
                <MainText>
                Welcome {this.context.username}, 
                Glad to have you with us today!{"\n"}

                Your drive is scheduled for today, 
                your car for the day will be {contextData && contextData.length > 1 ? contextData[0].vehicle : 'Placeholder'}.

                It always seems impossible until it's done 💪
                Together everyone achieves more!
                </MainText>
            
                <View style={{flexDirection: 'row', top: 200, }}>

                    <StartButton onPress={() => this.handleStartPress()}>
                        <BtnText>START</BtnText>
                    </StartButton>
                </View>
            </View> : <MainText>Sorry {this.context.username} No route for you today</MainText>}
            </PageContainer>
        );
    }
}

export default HomePage;