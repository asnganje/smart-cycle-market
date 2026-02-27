import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Colors } from "../../utils/colors";
import AuthNavigator from "./auth/AuthNavigator";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
};
export default Navigator;
