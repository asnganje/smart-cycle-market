import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../utils/colors";
import { formatPrice } from "../utils/helper";
import { s, vs } from "react-native-size-matters";
import { FC } from "react";
import { LatestProduct } from "../views/components/LatestProductList";

interface IProductCardProps {
  product: LatestProduct,
  onPress(item:LatestProduct):void
}

const ProductCard: FC<IProductCardProps> = ({onPress, product}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(product)}
      style={styles.productContainer}
    >
      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      ) : (
        <View style={[styles.thumbnail, styles.noImageView]}>
          <MaterialCommunityIcons
            name="image-off"
            size={35}
            color={Colors.primary}
          />
        </View>
      )}
      <Text style={styles.price}>{formatPrice(product.price)}</Text>
      <Text style={styles.name}>{product.name}</Text>
    </TouchableOpacity>
  );
};
export default ProductCard;
const styles = StyleSheet.create({
    productContainer: {
    padding: s(10),
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.active,
    paddingTop: vs(4),
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  thumbnail: {
    width: "100%",
    height: vs(100),
    borderRadius: 5,
  },
  noImageView: {
    backgroundColor: Colors.deActive,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
