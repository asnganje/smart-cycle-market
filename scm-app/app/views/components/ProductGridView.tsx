import { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "../../ui/GridView";
import { formatPrice } from "../../utils/helper";
import { Colors } from "../../utils/colors";
import { s, vs } from "react-native-size-matters";

interface IProductGridViewProps {
  data: LatestProduct[];
  onPress(item: LatestProduct): void
}

const ProductGridView: FC<IProductGridViewProps> = ({ data, onPress }) => {
  return (
    <GridView
      data={data}
      renderItem={(item) => {
        return (
          <TouchableOpacity onPress={()=>onPress(item)} style={styles.productContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};
export default ProductGridView;
const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },
  productContainer:{
    padding:s(10),
  },
  thumbnail: {
    width: "100%",
    height: vs(100),
    borderRadius: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.active,
    paddingTop: vs(4),
  },
});
