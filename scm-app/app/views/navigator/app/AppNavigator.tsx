import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Home";
import Chats from "../../Chats";
import ProductList from "../../ProductList";

export type AppStackParamList = {
  home: undefined;
  chats: undefined;
  productList: undefined
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
      <Stack.Screen name="chats" component={Chats} />
      <Stack.Screen name="productList" component={ProductList} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
