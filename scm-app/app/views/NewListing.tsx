import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FormInput from "../ui/FormInput";
import { s, vs } from "react-native-size-matters";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Colors } from "../utils/colors";
import DatePicker from "../ui/DatePicker";
import OptionModal from "./components/OptionModal";
import { ReactNode, useState } from "react";
import { categories } from "../utils/categories";
import CategoryOption from "../ui/CategoryOption";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AppButton from "../ui/AppButton";
import KeyBoardAvoider from "../ui/KeyBoardAvoider";
import * as ImagePicker from "expo-image-picker";
import { showMessage } from "react-native-flash-message";
import HorizontalImageList from "./components/HorizontalImageList";
import { newProductSchema, yupValidator } from "../utils/validator";
import mime from "mime";
import useClient from "../hooks/useClient";
import { runAxiosAsync } from "../api/runAxiosAsync";
import LoadingSpinner from "../ui/LoadingSpinner";
import OptionSelector from "../ui/OptionSelector";
import { selectImages } from "../utils/helper";

const isIOS = Platform.OS === "ios";

interface Item {
  name: string;
  icon: ReactNode;
}

const defaultInfo = {
  name: "",
  description: "",
  category: "",
  price: "",
  purchaseDate: new Date(),
};

const NewListing = () => {
  const [pending, setPending] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [productInfo, setProductInfo] = useState({ ...defaultInfo });
  const [images, setImages] = useState<string[]>([]);
  const [selectImg, setSelectedImg] = useState("");
  const { authClient } = useClient();

  const { category, name, description, purchaseDate, price } = productInfo;

  const imageOptions = [{ value: "Remove image", id: "remove" }];

  const handleChange = (name: string) => (text: string) => {
    setProductInfo({ ...productInfo, [name]: text });
  };

  const categoryChangeHandler = (item: Item) => {
    setProductInfo({ ...productInfo, category: item.name });
    setShowCategoryModal(false);
  };

  const imageSelectionHandler = async () => {
    const newImages = await selectImages()
    setImages([...images, ...newImages]);
  };

  const submitHandler = async () => {
    const { error } = await yupValidator(newProductSchema, productInfo);
    if (error) {
      return showMessage({ message: error, type: "danger" });
    }
    setPending(true)
    const formData = new FormData();

    type productInfoKeys = keyof typeof productInfo;

    for (let key in productInfo) {
      const value = productInfo[key as productInfoKeys];
      if (value instanceof Date) formData.append(key, value.toISOString());
      else {
        formData.append(key, value);
      }
    }

    const newImages = images.map((img, idx) => ({
      name: `name_${idx}`,
      type: mime.getType(img),
      uri: img,
    }));

    for (let img of newImages) {
      formData.append("images", img as any);
    }
    const res = await runAxiosAsync(authClient.post("/products/list", formData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }))
    setPending(false)
    if (res) {
      showMessage({
        message:res.message,
        type:"success"
      })
      setProductInfo({...defaultInfo});
      setImages([])
    }
    console.log(res);
  };

  return (
    <KeyBoardAvoider>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={imageSelectionHandler}>
            <View>
              <View style={styles.iconContainer}>
                <FontAwesome5 name="images" size={24} color="black" />
              </View>
              <Text style={styles.btnTitle}>Add images</Text>
            </View>
          </TouchableOpacity>
          <HorizontalImageList
            data={images}
            onLongPress={(img) => {
              setSelectedImg(img);
              setShowImageOptions(true);
            }}
          />
        </View>
        <FormInput
          placeholder="Product name"
          value={name}
          onChangeText={handleChange("name")}
        />
        <FormInput
          placeholder="Price"
          value={price}
          onChangeText={handleChange("price")}
          keyboardType="numeric"
        />
        <DatePicker
          title="Purchase date: "
          value={purchaseDate}
          onChange={(date) =>
            setProductInfo({ ...productInfo, purchaseDate: date })
          }
        />
        <OptionSelector category={category} onPress={() => setShowCategoryModal(true)}/>
        {/* <TouchableOpacity onPress={() => setShowCategoryModal(true)}>
          <View style={styles.categoryI}>
            <Text>{category || "Category"}</Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </View>
        </TouchableOpacity> */}
        <FormInput
          placeholder="Description"
          value={description}
          onChangeText={handleChange("description")}
          multiline
        />
        <AppButton isLoading={pending} title="List Product" onPress={submitHandler}>
          {pending && <LoadingSpinner />}
        </AppButton>
        <OptionModal
          options={categories}
          renderItem={(item) => {
            const { name, icon } = item;
            return <CategoryOption name={name} icon={icon} />;
          }}
          onPress={(item) => categoryChangeHandler(item)}
          visible={showCategoryModal}
          onRequestClose={setShowCategoryModal}
        />
        <OptionModal
          options={imageOptions}
          renderItem={(item) => {
            return <Text style={styles.imageOptions}>{item.value}</Text>;
          }}
          onPress={(item) => {
            if (item.id === "remove") {
              const newImages = images.filter((img) => img !== selectImg);
              setImages([...newImages]);
            }
            setShowImageOptions(false);
          }}
          visible={showImageOptions}
          onRequestClose={setShowImageOptions}
        />
      </ScrollView>
    </KeyBoardAvoider>
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
  imageContainer: {
    flexDirection: "row",
    gap: s(5),
  },
  imageOptions: {
    fontWeight: "600",
    color: "red",
    fontSize: 18,
    padding: 10,
  },
});
