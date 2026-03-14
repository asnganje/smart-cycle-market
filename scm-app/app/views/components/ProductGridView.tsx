import { FC } from "react";
import { StyleSheet } from "react-native";
import { LatestProduct } from "./LatestProductList";
import GridView from "../../ui/GridView";
import ProductCard from "../../ui/ProductCard";

interface IProductGridViewProps {
  data: LatestProduct[];
  onPress(item: LatestProduct): void;
}

const ProductGridView: FC<IProductGridViewProps> = ({ data, onPress }) => {
  return (
    <GridView
      data={data}
      renderItem={(item) => <ProductCard product={item} onPress={onPress} />}
    />
  );
};
export default ProductGridView;
const styles = StyleSheet.create({});
