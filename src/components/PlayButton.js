/*
 * File: PlayButton.js
 * Project: weatherapp
 * File Created: Wednesday, 13th December 2023 11:01:52 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Friday, 15th December 2023 8:57:59 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
import React from 'react';
import {Text, View, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Colors} from '../Constants';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const start = {x: 0, y: 0};
const end = {x: 1, y: 0};

Icon.loadFont();

const PlayButton = ({size, circle, icon, onPress, iconSize}) => {
  return (
    <Container size={size} onPress={onPress}>
      {/* <Image source={icon} style={{position:'relative',zIndex:1}}/> */}
      <Icon name={icon} size={iconSize} color="white" />
      <Circle
        circle={circle}
        colors={Colors.linearGradient}
        size={size}
        start={start}
        end={end}
        style={{opacity: 0.5, position: 'absolute', left: 0, bottom: 0}}
      />
      <Circle
        circle={circle}
        colors={Colors.linearGradient}
        size={size}
        start={start}
        end={end}
        style={{opacity: 0.5, position: 'absolute', right: 0, bottom: 0}}
      />
    </Container>
  );
};

const Container = styled.TouchableOpacity`
  width: ${props => props.size || 78}px;
  height: ${props => props.size || 78}px;
  justify-content: center;
  align-items: center;
`;

const Circle = styled(LinearGradient)`
  width: ${props => props.circle || 70}px;
  height: ${props => props.circle || 70}px;
  border-radius: ${props => props.circle / 2 || 705}px;
`;

export default PlayButton;
