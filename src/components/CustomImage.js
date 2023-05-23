import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import Spacing from '../constants/Spacing'
import Color from '../constants/Color';

const homeImage = require('../../assets/music.webp');

export default function CustomImage() {

    return (
        <View style={styles.imageView}>
            <View style={[styles.imageView, {borderColor: Color.liveColor3, borderWidth: 2}]}>
                <View style={[styles.imageView, {borderColor: Color.liveColor2, borderWidth: 3}]}>
                    <Image
                        style={styles.image}
                        source={homeImage}
                        contentFit="cover"
                        transition={1000}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        borderWidth: 1.3, 
        borderRadius: 1000,
        padding: Spacing.small,
        borderColor: Color.liveColor3,
        shadowColor: Color.primary,
        shadowOffset: {
            width: 0,
            height: 22,
        },
        shadowOpacity:  0.23,
        shadowRadius: 12.81,
        elevation: 16
    },
    image: {
        width: 160,
        height: 160,
        backgroundColor: '#0553',
        borderRadius: 150
    },
})