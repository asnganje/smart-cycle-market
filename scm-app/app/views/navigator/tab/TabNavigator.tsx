import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import AppNavigator from "../app/AppNavigator";
import ProfileNavigator from "../profile/ProfileNavigator";
import AntDesign from "@expo/vector-icons/AntDesign";
import NewListing from "../../NewListing";

const Tab = createBottomTabNavigator();

const getOptions = (iconName: string): BottomTabNavigationOptions => {
  return {
    tabBarIcon: ({ color, size }) => {
      return <AntDesign name={iconName as any} size={size} color={color} />;
    },
  };
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={getOptions("home")}
      />
      <Tab.Screen
        name="NewListing"
        component={NewListing}
        options={getOptions("plus-circle")}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={getOptions("user")}
      />
    </Tab.Navigator>
  );
};
export default TabNavigator;
