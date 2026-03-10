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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { getListingsState, Product, updateListings } from "../store/listings";
import { useDispatch, useSelector } from "react-redux";

type ListingsRes = {
  products: Product[];
};

const Listings = () => {
  const listings = useSelector(getListingsState)
  const [fetching, setFetching] = useState(false);
  const { authClient } = useClient();
  const dispatch = useDispatch()

  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();

  const fetchListings = async () => {
    setFetching(true);
    const res = await runAxiosAsync<ListingsRes>(
      authClient.get("/products/listings"),
    );

    setFetching(false);
    if (res) {
      dispatch(updateListings(res.products))
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
          refreshing={fetching}
          onRefresh={fetchListings}
          data={listings}
          contentContainerStyle={styles.flatlist}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigate("singleProduct", { product: item })}
                style={styles.listItem}
              >
                <ProductImage uri={item.thumbnail} />
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>
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
  listItem: {
    paddingBottom: size.padding,
  },
  productName: {
    fontWeight: "700",
    fontSize: 20,
    letterSpacing: s(1),
    marginTop: vs(10),
  },
  flatlist: {
    paddingBottom: vs(20),
  },
});
