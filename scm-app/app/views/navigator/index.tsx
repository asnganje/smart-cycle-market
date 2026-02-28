import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Colors } from "../../utils/colors";
import AuthNavigator from "./auth/AuthNavigator";
import AppNavigator from "./app/AppNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  const isLoggedIn = false;
  return (
    <NavigationContainer theme={MyTheme}>
      {!isLoggedIn ? <AuthNavigator />  : <AppNavigator />}
    </NavigationContainer>
  );
};
export default Navigator;
