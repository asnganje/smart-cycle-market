import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./app/views/navigator";
import FlashMessage from "react-native-flash-message";
import AppNavigator from "./app/views/navigator/app/AppNavigator";
import { Provider } from "react-redux";
import store from "./app/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Navigator />
          <FlashMessage position="top" />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
