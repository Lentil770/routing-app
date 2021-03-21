import React from 'react';
import { Button, Text, View } from 'react-native';

export default function StopPage(props) {
  return (<View>
      <Text>Stop Page number {props.pageNumber} </Text>
      <Button onPress={props.nextPage} title='next page' />
  </View>
  );
}
