import { FC, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { vs } from "react-native-size-matters";
import { Colors } from "../utils/colors";

interface CategoryOptionProps {
  name: string;
  icon: ReactNode;
}
const CategoryOption: FC<CategoryOptionProps> = ({ name, icon }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ transform: [{ scale: 0.4 }] }}>
        <Text>{icon}</Text>
      </View>
      <Text style={styles.category}>{name}</Text>
    </View>
  );
};
export default CategoryOption;
const styles = StyleSheet.create({
  category: {
    color: Colors.primary,
    paddingVertical: vs(10),
  },
});
