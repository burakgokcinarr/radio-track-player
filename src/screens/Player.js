import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CustomImage, Card } from '../components';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing'
import Color from '../constants/Color';
import { useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import RadioPlayer, { RadioPlayerEvents } from 'react-native-radio-player';
import BottomSheet from '@gorhom/bottom-sheet';

const RADIO_URL      = 'https://yayin5.radyohizmeti.com/8074/stream';
const PLAYLIST_COUNT = 5;

export default function Player() {

    const metadataSeparator         = "-";             // Used to split artist and title in stream metadata
    const navigation                = useNavigation();    
    const [play, setPlay]           = useState(false);
    const [title, setTitle]         = useState(null);  // Şarkı Adı
    const [artist, setArtist]       = useState(null);  // Şarkıcının Adı
    const [playList, setPlayList]   = useState([]);
    let playListData                = [];

    // variables
    const snapPoints = useMemo(() => ['15%', '60%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        //console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Radyo Memleket',
            headerRight: () =>  <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("settings")}>
                                    <Feather name="settings" size={25} color="white" />
                                </TouchableOpacity>
        });
    }, [])

    useEffect(() => {
        RadioPlayer.radioURLWithMetadataSeparator(RADIO_URL, metadataSeparator);

        RadioPlayerEvents.addListener("StateDidChange", (event) => {
            //console.log(event.state);
        });

        // Metadata: {"artistName": "Example Artist", "trackName": "Example Title"}
        RadioPlayerEvents.addListener("MetadataDidChange", (metadata) => {
            console.log(`Artist: ${metadata.artistName}`);
            console.log(`Title: ${metadata.trackName}`);
            //console.log("PlayList Sayısı = ", playListData.length);
            if (metadata.artistName) {
                setArtist(metadata.artistName);
            }
            if (metadata.trackName) {
                setTitle(metadata.trackName);
            }
            
            if (metadata.artistName || metadata.trackName) {

                //playListData.reverse();

                let found = false;
                playListData.map((data) => {
                    if (data.artistName == metadata.artistName && data.trackName == metadata.trackName) {
                        found = true;
                    }
                })
                if (!found) {
                    playListData.push({artistName: metadata.artistName, trackName: metadata.trackName});
                }
                
                if (playListData.length === (PLAYLIST_COUNT+1)) {
                    // İlk veriyi sil
                    playListData.shift();
                }
                
                setPlayList(playListData.reverse());
            }
        });
    }, []);

    const playClicked = () => {
        if (!play) {
            RadioPlayer.play();
        } else {
            RadioPlayer.stop();
        }
        setPlay(!play);
    }

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <CustomImage/>
            <Card isPlay={play} artistName={title} trackname={artist} playClicked={playClicked}/>
            <BottomSheet
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                handleStyle={{backgroundColor: '#fafafa'}}
                handleIndicatorStyle={{backgroundColor: Color.primary}}
            >
                <View style={styles.contentContainer}>
                    <Text style={styles.bottomSheetTitle}>En son dinlenen 5 şarkı listesi</Text>
                    {
                        playList.map((data, index) => {
                            return (
                                <View key={index} style={{flexDirection: 'row', justifyContent: 'flex-start', padding: 15}}>
                                    <MaterialCommunityIcons name={"numeric-" + (index + 1) + "-box"} size={25} color="#2596be" />
                                    <Text style={styles.lastMusic} key={data.artistName}>{data.artistName} - {data.trackName}</Text>
                                </View> 
                            )
                        })
                    }
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Spacing.xLarge
    },
    musicTitle: {
        fontFamily: Font['poppins-bold'],
        fontSize: FontSize.xLarge,
    },
    bottomSheetTitle: {
        fontFamily: Font['poppins-bold'],
        fontSize: FontSize.medium,
        color: Color.primary,
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1,
        //alignItems: 'center',
        backgroundColor: '#fafafa'
    },
    lastMusic: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.medium,
        color: Color.darkText,
        textAlign: 'center',
        alignSelf: 'center'
    },
    musicCount: {
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.medium,
        color: Color.darkText,
        textAlign: 'center'
    },
})