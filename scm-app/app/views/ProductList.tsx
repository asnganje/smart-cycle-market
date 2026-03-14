import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { AppStackParamList } from "./navigator/app/AppNavigator";
import { FC, useEffect, useState } from "react";
import { runAxiosAsync } from "../api/runAxiosAsync";
import useClient from "../hooks/useClient";
import { LatestProduct } from "./components/LatestProductList";
import ProductGridView from "./components/ProductGridView";
import { Colors } from "../utils/colors";
import { vs } from "react-native-size-matters";
import size from "../utils/size";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import EmptyView from "../ui/EmptyView";
import ProductCard from "../ui/ProductCard";

type ProductListProps = NativeStackScreenProps<
  AppStackParamList,
  "productList"
>;

const ProductList: FC<ProductListProps> = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState<LatestProduct[]>([]);
  const { authClient } = useClient();

  const isOdd = products.length % 2 !== 0

  const fetchProducts = async (category: string) => {
    const res = await runAxiosAsync<{ products: LatestProduct[] }>(
      authClient.get("/products/by-category/" + category),
    );
    if (res) {
      setProducts(res.products);
    }
  };

  useEffect(() => {
    if (category) fetchProducts(category);
  }, [category]);

  if (!products.length) {
    return (
      <View style={styles.container}>
        <AppHeader
          backButton={<BackButton />}
          center={<Text style={styles.title}>{category}</Text>}
        />
        <EmptyView title="There is no products in this category!" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={<Text style={styles.title}>{category}</Text>}
      />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View style={{flex: isOdd && index === products.length-1 ? 0.5 : 1}}>
          <ProductCard
            product={item}
            onPress={({ id }) => navigation.navigate("singleProduct", { id })}
          />
          </View>
        )}
      />
    </View>
  );
};
export default ProductList;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.padding,
  },
  title: {
    fontWeight: "600",
    color: Colors.primary,
    paddingBottom: vs(5),
    fontSize: 18,
  },
});
