import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome5 } from '@expo/vector-icons';
import { AppButton } from '../components';
import * as WebBrowser from 'expo-web-browser';
import { version, name } from '../../package.json'
import i18n from '../localization/i18n';
import { useNavigation } from '@react-navigation/native';
import Color from '../constants/Color';
import * as MailComposer from 'expo-mail-composer';

export default function Settings() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            title: '',
        })
    },[])

    const openPrivacyPolity = async() => {
        let result = await WebBrowser.openBrowserAsync('https://www.termsfeed.com/live/ceefa3ce-b114-40c5-b7f7-b29ff542dc6b');
    }

    const openTermsOfService = async() => {
        let result = await WebBrowser.openBrowserAsync('https://www.termsfeed.com/live/00639c15-34d4-4ec0-a10a-0de50eedb8cc');
    }

    const sendMail = async() => {
        MailComposer.composeAsync({
            recipients: 
            ['radyomemleketuk@gmail.com'],
            subject: '',
            body: '',
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.subView}>
                <AppButton title={i18n.t("privacy_polity")} onPress={() => openPrivacyPolity()}/>
            </View>
            <View style={styles.subView}>
                <AppButton title={i18n.t("terms_of_service")} onPress={() => openTermsOfService()}/>
            </View>
            <View style={styles.subView}>
                <AppButton title={i18n.t("send_mail")} onPress={() => sendMail()}/>
            </View>
            <View style={[styles.subView, {justifyContent: 'flex-end', flex: 1}]}>
                <Text style={{color: Color.primary, textAlign: 'center', fontSize: 15, fontWeight: '600'}}>{i18n.t("app_version")} ( {version} )</Text>
                <Text style={{color: Color.darkText, textAlign: 'center', fontSize: 11, fontWeight: '600', marginTop: 10, textTransform: 'uppercase'}}><FontAwesome5 name="copyright" size={10} color={Color.darkText} />2023 {name}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#041023',
    },
    subView: {
        padding: 22,
        justifyContent: 'center',
        //alignItems: 'center'
    },
    header: {
        paddingHorizontal: 10,
        paddingVertical: 20
    }
})