/*
 * File: Onboarding.js
 * Project: weatherapp
 * File Created: Wednesday, 13th December 2023 9:31:23 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Friday, 15th December 2023 8:58:06 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
import React from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import {Colors, Images} from '../Constants';
import styled from 'styled-components/native';
// import McImage from '../components/McImage';
import PlayButton from '../components/PlayButton';
// import { useNavigation } from '@react-navigation/native';

const Onboarding = ({navigation}) => {
  console.log(Colors.background);
  // const navigation = useNavigation();

  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
      <Image source={Images.logo} />
      <Text style={{color: Colors.pinkA200, fontSize: 24}}>
        The sound of life
      </Text>
      <Text style={{color: Colors.grey4, fontSize: 14}}>
        Music is not an entertainment, but also it is our life
      </Text>
      <View style={{marginTop: 200}}>
        <PlayButton
          size={78}
          circle={70}
          icon={'arrow-right'}
          iconSize={40}
          onPress={() => navigation.navigate('Library')}
        />
      </View>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
  color: '#000';
  justify-content: center;
  align-items: center;
  margin-top: -50px;
`;

export default Onboarding;
