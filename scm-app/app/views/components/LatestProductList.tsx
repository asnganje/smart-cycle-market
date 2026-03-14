import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../../utils/colors";
import { vs } from "react-native-size-matters";
import ProductGridView from "./ProductGridView";

export type LatestProduct = {
  id: string;
  name: string;
  price: number;
  category: string;
  thumbnail?: string;
};

interface ILatestProductListProps {
  data: LatestProduct[];
  onPress(product: LatestProduct): void;
}

const LatestProductList: FC<ILatestProductListProps> = ({ data, onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Listed Offers</Text>
      <ProductGridView data={data} onPress={onPress}/>
    </View>
  );
};
export default LatestProductList;
const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: "600",
    color: Colors.primary,
    fontSize: 20,
    marginBottom: vs(15),
    letterSpacing: 0,
  },
});
