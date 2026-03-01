import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Home";
import Profile from "../../Profile";

export type AppStackParamList = {
  home: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Profile} />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
