import { FC } from "react";
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { s } from "react-native-size-matters";

interface Images {
  data: string[];
  onPress?: (item: string) => void;
  onLongPress?: (item: string) => void;
  style?:StyleProp<ViewStyle>
}

const HorizontalImageList: FC<Images> = ({ data, onPress, onLongPress, style }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          onLongPress={() => onLongPress && onLongPress(item)}
          onPress={() => onPress && onPress(item)}
        >
          <Image style={styles.img} source={{ uri: item }} />
        </TouchableOpacity>
      )}
      contentContainerStyle={style}
      keyExtractor={(item) => item}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};
export default HorizontalImageList;
const styles = StyleSheet.create({
  listItem: {
    height: s(70),
    width: s(70),
    borderRadius: s(7),
    marginRight: s(3),
    overflow: "hidden",
  },
  img: {
    flex: 1,
  },
});
