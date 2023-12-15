/*
 * File: PlayButton.js
 * Project: weatherapp
 * File Created: Wednesday, 13th December 2023 11:01:52 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Friday, 15th December 2023 8:28:10 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
import React from 'react';
import {Text, View, Image} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Colors} from '../Constants';
// import styled from 'styled-components/native'
// import { Icon } from 'react-native-elements'
import Svg, {Circle, G, Path} from 'react-native-svg';

const start = {x: 0, y: 0};
const end = {x: 1, y: 0};

const BottomBar = ({children}) => {
  return (
    <View
      style={{
        width: 321,
        height: 84,
        borderRadius: 84,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
      <View style={{width: 42, height: 84}}></View>
      <View
        style={{display: 'flex', height: 84, justifyContent: 'space-between '}}>
        <LinearGradient
          colors={Colors.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            width: 321 - 84,
            height: 3,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        />
      </View>
      <View style={{marginTop: 45}}>
        <Svg height="84" width="84">
          <Circle
            cx="0"
            cy="'62"
            r="40"
            stroke="#ED1BA3"
            strokeWidth="3"
            fill="transparent"></Circle>
        </Svg>
      </View>
      <View
        style={{
          marginVertical: 7,
          marginHorizontal: 7,
          width: 321 - 84 + 70,
          height: 70,
          borderRadius: 70,
          backgroundColor: Colors.secondary,
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        {children}
      </View>
    </View>
  );
};

export default BottomBar;
