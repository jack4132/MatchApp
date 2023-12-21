/*
 * File: Library.js
 * Project: weatherapp
 * File Created: Wednesday, 13th December 2023 9:31:23 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Friday, 15th December 2023 9:04:25 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import {Colors, Images} from '../Constants';
import styled from 'styled-components/native';
// import McImage from '../components/McImage';
import PlayButton from '../components/PlayButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import dummyData from '../Mock/Data';
import BottomBar from '../components/Bottombar';
import {music} from '../Mock/Data';
import {Audio} from 'expo-av';
import {msToTime} from '../utilities/getTtime';
import {endPoint} from '../Mock/helper';

const Library = ({navigation}) => {
  // console.log(Colors.background)
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [selected, setSelected] = useState();
  const [duration, setDuration] = useState(0);
  const [playableTime, setPlayableTime] = useState(0);
  const [songName, setSongName] = useState('');
  const [id, setId] = useState(0);
  // const navigation = useNavigation();
  // console.log(sound)
  async function playSound(file, index) {
    try {
      if (file.music_data) {
        setSongName(file.music_data);
        setSelected(file);
        setId(index);
        // console.log('Loading Sound',file.music_data,`../../assets/music_data/${file.music_data}`,endPoint);
        const {sound, status} = await Audio.Sound.createAsync(
          endPoint[file.music_data],
          {
            shouldPlay: true, //To play the audio when the component is loadded
            isLooping: false,
          },
          onPlaybackStatusUpdate,
        );
        setSound(sound);
        if (songName !== file.music_data) {
          await sound.pauseAsync();
        }

        isPlaying ? await sound.pauseAsync() : await sound.playAsync();
        setPlayableTime(msToTime(status.playableDurationMillis));
        setDuration(msToTime(status.positionMillis));
        setIsPlaying(!isPlaying);
      }
    } catch (err) {
      // console.log(err)
    }
  }
  const onPlaybackStatusUpdate = async playbackStatus => {
    // console.log(playbackStatus)
    if (playbackStatus.isPlaying) {
      setDuration(msToTime(playbackStatus.positionMillis));
    }
  };

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <Container>
      <StatusBar barStyle={'light-content'} />
      <Text
        style={{
          fontSize: 35,
          color: Colors.pinkA200,
          fontWeight: 'bold',
          marginTop: 12,
          marginLeft: 24,
        }}>
        Library
      </Text>
      <SearhSection>
        <Icon name="search" size={20} color="white" style={{marginLeft: 10}} />
        <TextInput
          placeholder="Search song"
          placeholderTextColor={Colors.grey3}></TextInput>
      </SearhSection>
      <ScrollView contentContainerStyle={{marginTop: 14}} style={{}}>
        {music.map((item, index) => {
          return (
            <FavoriteItemView key={index}>
              <TouchableWithoutFeedback onPress={() => playSound(item, index)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                    backgroundColor:
                      songName === item.music_data
                        ? Colors.grey3
                        : Colors.background,
                    padding: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: '20px',
                      alignItems: 'center',
                    }}>
                    <MusicCircle>
                      <Icon name={'music'} size={26} color={'#fff'} />
                    </MusicCircle>
                    <View style={{marginLeft: 12}}>
                      <Text style={{color: '#fff'}}>{item.music_data}</Text>
                    </View>
                  </View>
                  <Icon
                    name="heart-o"
                    size={26}
                    color={'#fff'}
                    style={{marginTop: 5}}
                  />
                </View>
              </TouchableWithoutFeedback>
            </FavoriteItemView>
          );
        })}
      </ScrollView>
      <BottomSection>
        <BottomBar>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignItems: 'center',
              marginHorizontal: 16,
              marginVertical: 12,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Player', {
                  selectedMusic: selected,
                  play: isPlaying,
                  playableTime,
                  duration,
                  // sound,
                  id,
                });
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: '10px',
                  alignItems: 'center',
                }}>
                <MusicCircle>
                  <Icon name={'music'} size={26} color={'#fff'} />
                </MusicCircle>
                <View style={{marginLeft: 12}}>
                  <Text style={{color: '#fff'}}>{songName}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
            <PlayButton
              size={46}
              circle={40}
              icon={isPlaying ? 'pause' : 'play'}
              onPress={() => playSound(selected)}
              iconSize={20}
            />
            {/* <PlayButton size={46} circle={40} onPress={()=>navigation.navigate('Player')} icon={"pause"} iconSize={20}/> */}
          </View>
        </BottomBar>
      </BottomSection>
    </Container>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.background};
`;

const SearhSection = styled.SafeAreaView`
  width: 327px;
  height: 52px;
  border-radius: 30px;
  background-color: ${Colors.secondary};
  margin: 20px 24px 0px;
  flex-direction: row;
  justify-content: flex-start;
  lign-items: center;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FavoriteItemView = styled.View`
  margin: 10px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const SongDetailComp = styled.View`
 color:${Colors.grey5};
 font-weight:'medium;
 font-size:12px
`;
const MusicCircle = styled.View`
  width: 42px;
  height: 42px;
  border-radius: 42px;
  background-color: ${Colors.secondary};
  align-items: center;
  justify-content: center;
`;
const BottomSection = styled.View`
  margin: 0px 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  bottom: 50px;
  left: Opx;
  z-index: 1;
`;

export default Library;
