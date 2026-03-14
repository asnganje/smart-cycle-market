import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../Home";
import Chats from "../../Chats";
import ProductList from "../../ProductList";
import SingleProduct, { Product } from "../../SingleProduct";

export type AppStackParamList = {
  home: undefined;
  chats: undefined;
  productList: undefined;
  singleProduct:  {product?: Product, id?: string};
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
      <Stack.Screen name="singleProduct" component={SingleProduct} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
