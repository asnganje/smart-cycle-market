import { MaterialIcons } from "@expo/vector-icons";
import { FC } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { s, vs } from "react-native-size-matters";
import { Colors } from "../utils/colors";

const isIOS = Platform.OS === "ios";

interface IOptionSelectorProps {
  onPress:()=>void,
  category:string
}

const OptionSelector: FC<IOptionSelectorProps> = ({onPress, category}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.categoryI}>
        <Text>{category || "Category"}</Text>
        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};
export default OptionSelector;
const styles = StyleSheet.create({
  categoryI: {
    marginBottom: vs(10),
    flexDirection: "row",
    justifyContent: "space-between",
    padding: isIOS ? 0 : s(8),
    borderWidth: isIOS ? 0 : 1,
    borderColor: isIOS ? "" : Colors.deActive,
    borderRadius: s(5),
  },
});
