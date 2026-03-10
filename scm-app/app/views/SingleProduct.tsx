import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { FC, useState } from "react";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import ProductDetail from "./components/ProductDetail";
import useAuth from "../hooks/useAuth";
import OptionBtn from "../ui/OptionBtn";
import OptionModal from "./components/OptionModal";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Colors } from "../utils/colors";
import { s, vs } from "react-native-size-matters";
import useClient from "../hooks/useClient";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import LoadingSpinnerAnimate from "../ui/LoadingSpinnerAnimate";
import { useDispatch } from "react-redux";
import { deleteItem } from "../store/listings";
import { NavigationProp, useNavigation } from "@react-navigation/native";

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
];

const SingleProduct: FC<SingleProductProps> = ({ route, navigation }) => {
  const { product } = route.params;
  const { authState } = useAuth();
  const { authClient } = useClient();
  const [busy, setBusy] = useState(false);
  const isAdmin = authState.profile?.id === product?.seller.id;
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const {navigate} = useNavigation<NavigationProp<ProfileNavigatorParamList>>()

  const confirmDelete = async () => {
    const id = product?.id;
    if (!id) return;
    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.delete("/products/" + id),
    );
    setBusy(false);
    if (res?.message) {
      dispatch(deleteItem({ id }));
      showMessage({
        message: res.message,
        type: "success",
      });
      navigation.navigate("listings");
    }
  };

  const onDeletePress = () => {
    Alert.alert(
      "Are you sure?",
      "This action will remove the product permanently!",
      [
        { text: "Delete", style: "destructive", onPress: confirmDelete },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  return (
    <>
      <AppHeader
        backButton={<BackButton />}
        right={
          <OptionBtn visible={isAdmin} onPress={() => setShowMenu(true)} />
        }
      />
      <View>
        {product ? <ProductDetail product={product} /> : <></>}
        <TouchableOpacity onPress={()=>navigate("chatWindow")} style={styles.messageBtn}>
          <AntDesign name="message" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <OptionModal
        options={menuOptions}
        renderItem={({ icon, name }) => (
          <View style={styles.option}>
            {icon}
            <Text style={styles.optionTitle}>{name}</Text>
          </View>
        )}
        visible={showMenu}
        onRequestClose={setShowMenu}
        onPress={(option) => {
          if (option.name === "Delete") {
            onDeletePress();
          }
        }}
      />
      <LoadingSpinnerAnimate visible={busy} />
    </>
  );
};
export default SingleProduct;
const styles = StyleSheet.create({
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vs(10),
  },
  optionTitle: {
    paddingLeft: s(5),
    color: Colors.primary,
  },
  messageBtn:{
    width: s(50),
    height:s(50),
    borderRadius:s(25),
    backgroundColor:Colors.active,
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    right:s(20),
    bottom:s(40)
  }
});
