import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Color from "../constants/Color";
// STACK SCREENS
import { Player, Settings } from "../screens";

const Stack = createNativeStackNavigator();

function NavigationRouter() {

    return (
        <Stack.Navigator screenOptions={{headerShown: true, headerStyle: { backgroundColor: Color.active }, headerTintColor: Color.onPrimary }}>
            <Stack.Screen name="player" component={Player} />
            <Stack.Screen name="settings" component={Settings} />
        </Stack.Navigator>
    );
}

export default NavigationRouter;
