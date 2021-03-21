import React, { useContext } from 'react';
import { BackButton, Link } from "react-router-native";
import { StatusBar } from 'expo-status-bar';

import Context from "../user-context";
import TopBar from "./TopBar";

import { MainText, BtnText, DoneText } from '../styles/text';
import { PageContainer } from '../styles/screens';
import { MainButton } from "../styles/buttons";


export default function EndPage(props) {

  const appContext = useContext(Context);

  const dropoffText =  `Thank you for the hard work today, it is greatly appreciated.

  You’re the front line workers in our company and your hard work shows!

  Please park the van, near the office, if you cannot find parking you can always use the driveway at 740 Montgomery St,
  (The driveway is narrow so just be alert).

  Rest up, looking forward to seeing you at the next drive!
  `

  return (
    <PageContainer>
      <StatusBar style="auto" />
      <TopBar />
      <BackButton />
      <DoneText>  ALL{"\n"}DONE!</DoneText>
      <MainText>{appContext.data.length>0 ? appContext.data[0].dropoff_info : dropoffText}</MainText>
      
      <Link to="/home"  component={MainButton}><BtnText>WELCOME PAGE</BtnText></Link> 
    </PageContainer>
  );
}
