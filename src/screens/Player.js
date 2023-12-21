/*
 * File: Onboarding.js
 * Project: weatherapp
 * File Created: Wednesday, 13th December 2023 9:31:23 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Friday, 15th December 2023 10:19:28 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, LogBox, Image } from 'react-native'
import { Colors, Images } from '../Constants'
import styled from 'styled-components/native'
// import McImage from '../components/McImage';
import PlayButton from '../components/PlayButton';
// import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import Slider from '@react-native-community/slider'
import { Audio } from 'expo-av';
import { msToTime } from '../utilities/getTtime';
import { endPoint } from '../Mock/helper';
import { music } from '../Mock/Data';
import { transformImageToTensor } from '../utilities/toTensor';
import { fetch, decodeJpeg, bundleResourceIO } from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
// import * as mobilenet from '@tensorflow-models/mobilenet';
// import * as FileSystem from 'expo-file-system';
import {
    loadTensorflowModel,
    useTensorflowModel,
} from 'react-native-fast-tflite'
// import * as FileSystem from "expo-file-system";

import RNFS from 'react-native-fs';
import RNFetchBlob from "rn-fetch-blob";
import { RNTFLite } from 'react-native-tflite';
// // import RNFetchBlob from 'react-native-fetch-blob';
// import imgPath from "../../assets/img_data/blues00000.jpg";
import Tflite from 'tflite-react-native';





const Player = ({ navigation, route }) => {
    const ref = useRef()
    const [sound, setSound] = useState(route.params.sound);
    const [isPlaying, setIsPlaying] = useState(route.params.play)
    const [duration, setDuration] = useState(route.params.duration);
    const [playableTime, setPlayableTime] = useState(route.params.playableTime)
    const [id, setId] = useState(route.params.id)
    const [songName, setSongName] = useState(route.params.selectedMusic.music_data)
    const [selected, setSelected] = useState(route.params.selectedMusic)
    LogBox.ignoreLogs(['Non-serializable values were found in the navigation state',]);
    //    console.log(typeof route.params.sound,'k')
    // const tfml=async()=>{
    //     // const model = tf.loadLayersModel(require('../../assets/model/GTZAN_PreTrainedModel.tflite'))
    //     const model = await mobilenet.load();

    //     const imageData = await (require('../../assets/img_data/blues00000.png')).arrayBuffer();
    //     const imageTensor = decodeJpeg(imageData);
    //     console.log(imageTensor,model,'model')
    // }
    //     const loadMelSpectrogramImage = async () => {
    //         try{
    //         const imageUri = RNFS.MainBundlePath + '/AwesomeProject/assets/img_data/metal00002.png';
    //        console.log(imageUri,'ccc')
    //         const imageContents = await RNFS.readFile(require('/Users/jacksonthounaojam/Desktop/MATCH_PROJ/AwesomeProject/assets/img_data/rock00002.png'), 'base64');
    //          console.log(imageContents,'ddd')
    //         return `data:image/png;base64,${imageContents}`;
    //         }catch(err){
    //             console.log(err,'err')
    //         }
    //         };

    //     const processMelSpectrogramImage = async () => {
    //         try{
    //         const imageUri = await loadMelSpectrogramImage()
    //         const response = await fetch(imageUri);
    //         console.log(response,'check')
    //         const blob = await imageUri.blob();

    //         const arrayBuffer = await blob.arrayBuffer();
    //         const uint8Array = new Uint8Array(arrayBuffer);
    //         const imageTensor = tf.node.decodeImage(uint8Array);

    //         return imageTensor;

    //         }catch(err){
    //             console.log(err)
    //         }
    // };
    const reader = new FileReader();
    // const imgData =  require('../../assets/city-background.jpg');
    useEffect(() => {
        const convertToTensor = async () => {
            try {

                const model = await loadTensorflowModel(require('../../assets/model/GTZAN_PreTrainedModel.tflite'))

                // Specify the path to your image file in the assets folder
                const imagePath = require('../../assets/img_data/blues00000.jpg');
                const a = Image.resolveAssetSource(imagePath)
                // const blob = await a.blob();
                const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', a.uri);
                const iPath = response.path();

                const binaryData = await RNFS.readFile(iPath, 'base64');

                // Convert base64 encoded binary data to Uint8Array
                const uint8Array = new Uint8Array(Buffer.from(binaryData, 'base64'));

                const tensorInit = tf.tensor(uint8Array)
                const desiredShape = [1, 288, 432, 3];

                // const zerosNeeded = 373248 - 62497;
                //   const zerosTensor = tf.zeros([zerosNeeded]);
                //   const paddedTensor = tf.concat([tensorInit, zerosTensor], 0);
                //   const reshapedTensor = tf.reshape(paddedTensor, desiredShape);

                const floatTensor = tensorInit.toFloat();

                // Normalize pixel values to the range [0, 1]
                const normalizedTensor = tf.div(floatTensor, 255.0);
                // const normalizedArray = normalizedTensor.array();
                // normalizedTensor.print()
                // Log or use the normalized array
                console.log(normalizedTensor, 'l')
                // const inputTensor = tensor.expandDims(0);


                const outputData = await model.run(Array.from(normalizedTensor.dataSync()))
                // console.log(inputTensor)


                // const predictions = await RNTFLite.runModelOnTensor({ tensor: normalizedTensor });

                // console.log(outputData)
                // console.log(imageTensor,'img')
            } catch (error) {
                console.error('Error converting image to tensor:', error);
            }

        }

        const res = convertToTensor();
        // tfml();
        // rconst model =  (require('../../assets/model/GTZAN_PreTrainedModel.tflite'))
        // console.log(loadTensorflowModel)
    }, [])

    async function playSound(file, index) {
        console.log('Loading Sound', file);
        const { sound, status } = await Audio.Sound.createAsync(endPoint[file.music_data], {
            shouldPlay: true, //To play the audio when the component is loadded

        },
            onPlaybackStatusUpdate,
        );
        setSelected(file)

        console.log(transformImageToTensor(file.image_data), 'lll')
        setSongName(file.music_data)
        setSound(sound);
        isPlaying ? await sound.pauseAsync() : await sound.playAsync();
        setPlayableTime(msToTime(status.playableDurationMillis))
        setDuration(msToTime(status.positionMillis))
        setId(index)
        setSongName(file.music_data)
        // sound.setOnPlaybackStatusUpdate(()=>setDuration(status.positionMilis);
        setIsPlaying(!isPlaying)
        console.log('Playing Sound', status);
    }
    const onPlaybackStatusUpdate = async (playbackStatus) => {
        console.log(playbackStatus)
        if (playbackStatus.isPlaying) {
            setDuration(msToTime(playbackStatus.positionMillis))
        }
        if (playbackStatus.didJustFinish) {
            setIsPlaying(false)
        }

    }


    React.useEffect(() => {
        if (sound) {
            return sound
                ? () => {
                    console.log('Unloading Sound');
                    sound.unloadAsync();
                }
                : undefined;
        }
    }, [sound]);
    console.log(Colors.background, isPlaying)


    return (
        <Container>
            <StatusBar barStyle={'light-content'} />
            {/* <Image source={imgData} ref={ref}/> */}
            <HeaderSection>
                <TouchableOpacity onPress={() => navigation.navigate('Library')}>
                    <Icon name={'arrow-left'} size={25} color="white" type="entypo" />
                </TouchableOpacity>
            </HeaderSection>
            <View style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
                <MusicDetailSection>
                    <View>
                        <Text style={{ fontSize: 34, color: Colors.grey5, fontWeight: 500, textAlign: 'center' }}>
                            {songName}
                        </Text>
                        <Text medium style={{ fontSize: 24, color: Colors.grey3, textAlign: 'center' }}> artist
                        </Text>
                    </View>
                </MusicDetailSection>
                <SliderSection>
                    <Slider minimumValue={0} maximumValue={1} value={duration / playableTime} minimumTrackTinyColor={Colors.primary} maximumTrackTinyColor={Colors.grey3} ></Slider>
                    {/* <Progress.Bar progress={0} width={500} /> */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 12, color: Colors.grey4 }}>{duration}</Text>
                        <Text style={{ fontSize: 12, color: Colors.grey4 }}>{playableTime}</Text>
                    </View>
                </SliderSection>
                <ControlSection>
                    <View style={{
                        width: 231, height: 70, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
                    }}><View style={{
                        width: 231, height: 54, borderRadius: 54, backgroundColor: Colors.secondary, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center',
                    }}><Icon name={'arrow-left'} size={20} color="white" type="entypo" style={{ marginLeft: 10 }} onPress={() => id > 0 && playSound(music[id - 1], id - 1)} disabled={id == 0} /><View style={{
                        width: 88, height: 88, borderRadius: 88, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background
                    }}><PlayButton size={70} circle={62.82} icon={isPlaying ? "pause" : "play"} onPress={() => playSound(selected, route.params.id)} iconSize={40} /></View><Icon name={'arrow-right'} size={20} color="white" type="entypo" style={{ marginRight: 10 }} disabled={id == 14} onPress={() => id < 14 && playSound(music[id + 1], id + 1)} />
                        </View></View>
                </ControlSection>
            </View>
        </Container>
    );
};



const HeaderSection = styled.View`
margin: 12px 24px;
flex-direction: row;
justify-content: space-between;
align-items: center;
`

const Container = styled.SafeAreaView`
    flex:1;
    background-color:${Colors.background};
    
`;
const MusicDetailSection = styled.View`
margin: 0px 24px;
justify-content: center;
align-items: center;
`

const SliderSection = styled.View`
margin: 0px 24px;
`
const ControlSection = styled.View`
margin: 12px 24px; flex-direction: row;
justify-content: center;
align-items: center;
`

export default Player