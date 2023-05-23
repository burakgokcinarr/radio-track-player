import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import NavigationRouter from './src/navigation/NavigationRouter';
import { useFonts } from 'expo-font';
import Font from "./src/config/Font";
import Color from './src/constants/Color';
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.themeBackground,
  },
}; 

export default function App() {

  const [isLoaded] = useFonts(Font);
  
  if (!isLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={theme}>
        <NavigationRouter/>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}