import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import Color from '../constants/Color';
import MarqueeText from 'react-native-marquee';
import { Entypo } from '@expo/vector-icons';

export default function Card({ isPlay, artistName, trackname, playClicked }) {
    return (
        <View style={styles.card}>
            <MarqueeText
                style={styles.appTitle}
                speed={0.5}
                marqueeOnStart={true}
                loop={true}
            >
            Radyo Memleket - Kalbinin Sesini Dinle
            </MarqueeText>
            {
                trackname && <Text style={styles.listen}><FontAwesome name="microphone" size={18} color={Color.onPrimary} />  Şimdi Dinleniyor...</Text>
            }
            <Text style={styles.trackTitle} numberOfLines={2}><Entypo name="dot-single" size={24} color="#2596be" /> {trackname} <Entypo name="dot-single" size={24} color="#2596be" /></Text>
            <Text style={styles.trackName} numberOfLines={3}>{artistName}</Text>
            <TouchableOpacity style={{marginTop: Spacing.xLarge, alignItems: 'center'}} onPress={playClicked}>
                <AntDesign name={isPlay ? 'pausecircle' : 'play'} size={60} color={isPlay ? '#2596be' : "white"} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    listen: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.small,
        alignSelf: 'center',
        marginTop: Spacing.xxLarge,
        color: Color.onPrimary
    },
    appTitle: {
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.large,
        alignSelf: 'center',
        //marginTop: Spacing.small,
        color: '#2596be',
        textAlign: 'center'
    },
    trackTitle: {
        fontFamily: Font['poppins-semiBold'],
        fontSize: FontSize.large,
        alignSelf: 'center',
        marginTop: Spacing.small,
        color: Color.onPrimary,
        textAlign: 'center'
    },
    trackName: {
        fontFamily: Font['poppins-regular'],
        fontSize: FontSize.large,
        alignSelf: 'center',
        marginTop: Spacing.small,
        color: Color.onPrimary
    },
    card: {
        width: '90%',
        borderWidth: 2,
        backgroundColor: Color.primary,
        borderColor: '#00002a',
        borderRadius: 10,
        padding: Spacing.small,
        marginTop: Spacing.medium,
        shadowColor: Color.primary,
        shadowOffset: {
            width: 0,
            height: 22,
        },
        shadowOpacity:  0.23,
        shadowRadius: 12.81,
        elevation: 16
    }
})