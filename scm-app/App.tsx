import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignIn from './app/views/SignIn';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './app/views/SignUp';
import ForgotPass from './app/views/ForgotPass';
import { Colors } from './app/utils/colors';

const Stack = createNativeStackNavigator()

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white
  },
};

export default function App() {

  return (
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <NavigationContainer
        theme={MyTheme}
      >
        <Stack.Navigator screenOptions={{
          headerShown:false
        }}>
          <Stack.Screen name='signIn' component={SignIn} />
          <Stack.Screen name='signUp' component={SignUp} />
          <Stack.Screen name='forgotPass' component={ForgotPass} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
