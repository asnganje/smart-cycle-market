import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import useClient from "../hooks/useClient";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { useEffect, useState } from "react";
import size from "../utils/size";
import ProductImage from "../ui/ProductImage";
import { s, vs } from "react-native-size-matters";
import { Product } from "./SingleProduct";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";

type ListingsRes = {
  products: Product[];
};

const Listings = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();
  const { navigate} = useNavigation<NavigationProp<ProfileNavigatorParamList>>()

  const fetchListings = async () => {
    const res = await runAxiosAsync<ListingsRes>(
      authClient.get("/products/listings"),
    );

    if (res) {
      setListings(res.products);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <AppHeader backButton={<BackButton />} />
        <FlatList
          data={listings}
          contentContainerStyle={styles.flatlist}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={()=>navigate("singleProduct", {product: item})} style={styles.listItem}>
                <ProductImage uri={item.thumbnail} />
                <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </>
  );
};
export default Listings;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.padding,
  },
  listItem:{
    paddingBottom: size.padding
  },
  productName:{
    fontWeight:"700",
    fontSize:20,
    letterSpacing: s(1),
    marginTop:vs(10)
  },
  flatlist:{
    paddingBottom: vs(20)
  }
});
