import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../ui/FormInput";
import { s, vs } from "react-native-size-matters";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "../utils/colors";
import DatePicker from "../ui/DatePicker";
import OptionModal from "./components/OptionModal";
import { useState } from "react";
import { categories } from "../utils/categories";
import CategoryOption from "../ui/CategoryOption";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const isIOS = Platform.OS === "ios";

const NewListing = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <FontAwesome5 name="images" size={24} color="black" />
        </View>
        <Text style={styles.btnTitle}>Add images</Text>
      </TouchableOpacity>
      <FormInput placeholder="Product name" />
      <FormInput placeholder="Price" />
      <DatePicker
        title="Purchase date: "
        value={new Date()}
        onChange={() => {}}
      />
      <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
        <View style={styles.categoryI}>
          <Text>Category</Text>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>
      </TouchableOpacity>
      <FormInput placeholder="Description" />
      <OptionModal
        options={categories}
        renderItem={(item) => {
          const { name, icon } = item;
          return <CategoryOption name={name} icon={icon} />;
        }}
        onPress={(item) => {
          console.log(item);
        }}
        visible={showCategoryModal}
        onRequestClose={setShowCategoryModal}
      />
    </View>
  );
};
export default NewListing;
const styles = StyleSheet.create({
  container: {
    padding: s(15),
  },
  fileSelector: {
    alignItems: "center",
    justifyContent: "center",
  },
  btnTitle: {
    color: Colors.primary,
    marginBottom: vs(20),
  },
  categoryI: {
    marginBottom: vs(10),
    flexDirection: "row",
    justifyContent:"space-between",
    padding: isIOS ? 0 : s(8),
    borderWidth: isIOS ? 0 : 1,
    borderColor: isIOS ? "" : Colors.deActive,
    borderRadius: s(5),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: vs(4),
    width: s(70),
    height: s(70),
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: s(5),
  },
});
