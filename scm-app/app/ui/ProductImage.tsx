import { FC } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import size from "../utils/size";

interface IProductImgProps {
  uri?: string;
}

const { width } = Dimensions.get("screen");
const imgWidth = width - size.padding * 2;
const aspect = 16 / 9;

const ProductImage: FC<IProductImgProps> = ({ uri }) => {
  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMethod="resize"
      resizeMode="cover"
    />
  );
};
export default ProductImage;
const styles = StyleSheet.create({
  image: {
    width: imgWidth,
    height: imgWidth / aspect,
    borderRadius: 7,
  },
});
