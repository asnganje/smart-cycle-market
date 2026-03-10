import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { FC, useState } from "react";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import ProductDetail from "./components/ProductDetail";
import useAuth from "../hooks/useAuth";
import OptionBtn from "../ui/OptionBtn";
import OptionModal from "./components/OptionModal";
import { Feather } from "@expo/vector-icons";
import { Colors } from "../utils/colors";
import { s, vs } from "react-native-size-matters";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
  description: string;
  date: string;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type SingleProductProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "singleProduct"
>;

const menuOptions = [
    {
    name: "Edit",
    icon: <Feather name="edit" size={20} color={Colors.primary} />,
  },
  {
    name: "Delete",
    icon: <Feather name="trash-2" size={20} color={Colors.primary} />,
  },
]


const SingleProduct: FC<SingleProductProps> = ({ route }) => {
  const { product } = route.params;
  const { authState } = useAuth();
  const isAdmin = authState.profile?.id === product?.seller.id;
  const [showMenu, setShowMenu] = useState(false)


  return (
    <>
      <AppHeader backButton={<BackButton />} right={<OptionBtn visible={isAdmin} onPress={()=>setShowMenu(true)} />} />
      <View>{product ? <ProductDetail product={product} /> : <></>}</View>
      <OptionModal options={menuOptions} renderItem={({icon, name})=> <View style = {styles.option}>
        {icon}
        <Text style={styles.optionTitle}>{name}</Text>
      </View>} visible={showMenu} onRequestClose={setShowMenu}/>
    </>
  );
};
export default SingleProduct;
const styles = StyleSheet.create({
  option:{
    flexDirection:"row",
    alignItems:"center",
    paddingVertical:vs(10)
  },
  optionTitle:{
    paddingLeft:s(5),
    color:Colors.primary
  }
});
