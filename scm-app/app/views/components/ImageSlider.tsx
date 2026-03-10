import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import ProductImage from "../../ui/ProductImage";
import { useRef, useState } from "react";
import { s } from "react-native-size-matters";
import { Colors } from "../../utils/colors";

interface ImageSliderProps {
  images?: string[];
}
const ImageSlider = ({ images }: ImageSliderProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const viewableConfig = useRef({ itemVisiblePercentThreshold: 50 });
  const onViewableItemsChanged = useRef(
    (info: {
      viewableItems: ViewToken<string>[];
      changed: ViewToken<string>[];
    }) => {setActiveIdx(info.viewableItems[0].index || 0)},
  );
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={images}
        renderItem={({ item }) => <ProductImage uri={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        viewabilityConfig={viewableConfig.current}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <View style={styles.indicator}>
        <Text style={styles.indicatorText}>
          {activeIdx + 1}/{images?.length}
        </Text>
      </View>
    </View>
  );
};
export default ImageSlider;
const styles = StyleSheet.create({
  container: {},
  indicator: {
    position: "absolute",
    width: s(35),
    height: s(25),
    backgroundColor: Colors.backDropDark,
    bottom: s(10),
    right: s(10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(5),
  },
  indicatorText: {
    color: Colors.white,
  },
  flatlist: {
    position: "relative",
  },
});
