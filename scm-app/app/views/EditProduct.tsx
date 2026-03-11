import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import size from "../utils/size";
import { Colors } from "../utils/colors";
import HorizontalImageList from "./components/HorizontalImageList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { FC, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { s, vs } from "react-native-size-matters";
import FormInput from "../ui/FormInput";
import DatePicker from "../ui/DatePicker";
import OptionSelector from "../ui/OptionSelector";
import OptionModal from "./components/OptionModal";
import useClient from "../hooks/useClient";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { selectImages } from "../utils/helper";

type EditProductProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "editProduct"
>;

const imageOptions = [
  { value: "Use as Thumbnail", id: "thumb" },
  { value: "Remove Image", id: "remove" },
];

const EditProduct: FC<EditProductProps> = ({ route }) => {
  const [selectImg, setSelectImg] = useState("");
  const [showImgOptions, setShowImgOptions] = useState(false);
  const { authClient } = useClient();
  const [product, setProduct] = useState({
    ...route.params.product,
    price: route.params.product.price.toString(),
    date: new Date(route.params.product.date),
  });

  const onLongPress = (image: string) => {
    setShowImgOptions(true);
    setSelectImg(image);
  };

  const onRemoveSelectedImg = async () => {
    const notLocalImg = selectImg.startsWith("https://res.cloudinary.com");
    
    const images = product.images
    const newImages = images?.filter((img)=>img !== selectImg)
    setProduct({...product, images: newImages})
    
    if (notLocalImg) {
      const imageId = selectImg
        .split("/")
        [selectImg.split("/").length - 1].split(".")[0];
      await runAxiosAsync<{ message: string }>(
        authClient.delete(`/products/image/${product.id}/${imageId}`),
      );
    }
    setShowImgOptions(false);
  };

  const OnImageSelection = async () => {
    const newImages = await selectImages()
    const oldImages = product.images || []
    const images = oldImages.concat(newImages)
    setProduct({...product, images: [...images]})
  }

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <HorizontalImageList
            data={product.images || []}
            onLongPress={onLongPress}
          />
          <TouchableOpacity onPress={OnImageSelection} style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <FormInput
            placeholder="Product name"
            value={product.name}
            onChangeText={(name) => setProduct({ ...product, name })}
          />
          <FormInput
            placeholder="Price"
            keyboardType="numeric"
            value={product.price.toString()}
            onChangeText={(price) => setProduct({ ...product, price })}
          />
          <DatePicker
            title="Purchase date: "
            value={product.date}
            onChange={(date) => setProduct({ ...product, date })}
          />
          <OptionSelector category={product.category} onPress={() => {}} />
          <FormInput
            placeholder="Description"
            value={product.description}
            onChangeText={(description) => setProduct({ ...product, description })}
          />
        </ScrollView>
      </View>
      <OptionModal
        options={imageOptions}
        renderItem={(option) => {
          return <Text style={styles.option}>{option.value}</Text>;
        }}
        onPress={({ id }) => {
          if (id === "thumb") {
          }
          if (id === "remove") {
            onRemoveSelectedImg();
          }
        }}
        visible={showImgOptions}
        onRequestClose={setShowImgOptions}
      />
    </>
  );
};
export default EditProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: size.padding,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
  },
  imageSelector: {
    height: s(70),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderRadius: s(7),
    borderColor: Colors.primary,
    marginVertical: vs(10),
  },
  option: {
    paddingVertical: vs(10),
    color: Colors.primary,
  },
});
