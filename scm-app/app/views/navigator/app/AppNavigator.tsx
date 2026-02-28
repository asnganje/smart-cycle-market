import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Home";

export type AppStackParamList = {
  home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
