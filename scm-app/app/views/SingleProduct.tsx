import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { FC } from "react";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import ProductDetail from "./components/ProductDetail";

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

const SingleProduct: FC<SingleProductProps> = ({ route }) => {
  const { product } = route.params;
  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View>{product ? <ProductDetail product={product}/> : <></>}</View>
    </>
  );
};
export default SingleProduct;
const styles = StyleSheet.create({});
