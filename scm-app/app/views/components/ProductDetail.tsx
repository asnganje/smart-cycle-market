import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Product } from "../SingleProduct";
import { FC } from "react";
import { formatDate } from "../../utils/date";
import size from "../../utils/size";
import AvatarView from "../../ui/AvatarView";
import { s, vs } from "react-native-size-matters";
import { Colors } from "../../utils/colors";
import { formatPrice } from "../../utils/helper";
import Profile from "../Profile";
import ImageSlider from "./ImageSlider";

interface IProductDetailProps {
  product: Product;
}

const ProductDetail: FC<IProductDetailProps> = ({ product }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageSlider images={product.images}/>
      <Text style={styles.category}>{product?.category}</Text>
      <Text style={styles.price}>{formatPrice(product?.price)}</Text>
      <Text style={styles.date}>
        Purchased on: {formatDate(product?.date, "dd LLL yyyy")}
      </Text>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.profileContainer}>
        <AvatarView uri={product.seller.avatar} size={60} />
        <Text style={styles.profileName}>{product.seller.name}</Text>
      </View>
    </ScrollView>
  );
};
export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    padding: size.padding,
  },
  category: {
    marginTop: vs(15),
    color: Colors.primary,
    fontWeight: "700",
  },
  price: {
    marginTop: vs(5),
    color: Colors.active,
    fontWeight: "700",
    fontSize: 20,
  },
  date: {
    marginTop: vs(5),
    color: Colors.active,
    fontWeight: "700",
  },
  name: {
    marginTop: vs(15),
    color: Colors.primary,
    letterSpacing: s(1),
    fontWeight: "700",
    fontSize: 20,
  },
  description: {
    marginTop: vs(15),
    color: Colors.primary,
    letterSpacing: s(0.5),
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vs(20),
  },
  profileName: {
    paddingLeft: vs(15),
    color: Colors.primary,
    letterSpacing: s(0.5),
    fontWeight: "600",
    fontSize: 20,
  },
});
