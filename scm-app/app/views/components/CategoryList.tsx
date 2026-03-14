import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import categories from "../../utils/categories";
import { Colors } from "../../utils/colors";
import { s, vs } from "react-native-size-matters";
import { FC } from "react";

const LIST_ITEM_SIZE = 80;

interface CategoryListProps {
  onPress(category: string): void;
}

const CategoryList: FC<CategoryListProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => onPress(item.name)}
              style={styles.listItem}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
              <Text numberOfLines={2} style={styles.categoryName}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default CategoryList;
const styles = StyleSheet.create({
  container: {
    marginVertical: vs(15),
  },
  iconContainer: {
    width: LIST_ITEM_SIZE,
    height: LIST_ITEM_SIZE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: Colors.primary,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    paddingTop: 2,
    color: Colors.primary,
  },
  listItem: {
    width: LIST_ITEM_SIZE,
    marginRight: s(15),
  },
});
