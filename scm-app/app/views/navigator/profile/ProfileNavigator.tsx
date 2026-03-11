import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../Profile";
import Chats from "../../Chats";
import Listings from "../../Listings";
import SingleProduct from "../../SingleProduct";
import { Product } from "../../../store/listings";
import ChatWindow from "../../ChatWindow";
import EditProduct from "../../EditProduct";

export type ProfileNavigatorParamList = {
  profile: undefined;
  chats: undefined;
  listings: undefined;
  singleProduct: {product?: Product};
  editProduct: {product: Product};
  chatWindow: undefined;
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
      <Stack.Screen name="singleProduct" component={SingleProduct} />
      <Stack.Screen name="editProduct" component={EditProduct}/>
      <Stack.Screen name="chatWindow" component={ChatWindow}/>
    </Stack.Navigator>
  );
};
export default ProfileNavigator;
