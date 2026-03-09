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

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
  description: string;
  date: Date;
  seller: {
    id: string;
    name: string;
    avatar?: string;
  };
};

type ListingsRes = {
  products: Product[];
};

const Listings = () => {
  const [listings, setListings] = useState<Product[]>([]);
  const { authClient } = useClient();

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
              <TouchableOpacity style={styles.listItem}>
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
