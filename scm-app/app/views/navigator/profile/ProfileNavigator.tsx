import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../Profile";
import Chats from "../../Chats";
import Listings from "../../Listings";

export type ProfileNavigatorParamList = {
  profile: undefined;
  chats: undefined;
  listings: undefined;
};

const Stack = createNativeStackNavigator<ProfileNavigatorParamList>();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="chats" component={Chats} />
      <Stack.Screen name="listings" component={Listings} />
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
