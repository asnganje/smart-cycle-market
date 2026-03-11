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
import categories from "../utils/categories";
import CategoryOption from "../ui/CategoryOption";
import { Item } from "./NewListing";
import AppButton from "../ui/AppButton";
import LoadingSpinner from "../ui/LoadingSpinner";
import { newProductSchema, yupValidator } from "../utils/validator";
import { showMessage } from "react-native-flash-message";
import mime from "mime";
import deepEqual from "deep-equal";

type EditProductProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "editProduct"
>;

type ProductInfo = {
  name: string;
  description: string;
  category: string;
  price: string;
  purchaseDate: Date;
};

const imageOptions = [
  { value: "Use as Thumbnail", id: "thumb" },
  { value: "Remove Image", id: "remove" },
];

const EditProduct: FC<EditProductProps> = ({ route, navigation }) => {
  const productInfoToUpdate = {
    ...route.params.product,
    price: route.params.product.price.toString(),
    date: new Date(route.params.product.date),
  };
  const [selectImg, setSelectImg] = useState("");
  const [busy, setBusy] = useState(false);
  const [showImgOptions, setShowImgOptions] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { authClient } = useClient();
  const [product, setProduct] = useState({...productInfoToUpdate});

  const isFormChanged = deepEqual(productInfoToUpdate, product);

  const onLongPress = (image: string) => {
    setShowImgOptions(true);
    setSelectImg(image);
  };

  const categoryChangeHandler = (item: Item) => {
    setProduct({ ...product, category: item.name });
    setShowCategoryModal(false);
  };

  const onRemoveSelectedImg = async () => {
    const notLocalImg = selectImg.startsWith("https://res.cloudinary.com");

    const images = product.images;
    const newImages = images?.filter((img) => img !== selectImg);
    setProduct({ ...product, images: newImages });

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
    const newImages = await selectImages();
    const oldImages = product.images || [];
    const images = oldImages.concat(newImages);
    setProduct({ ...product, images: [...images] });
  };

  const onSubmitHandler = async () => {
    const dataToUpdate: ProductInfo = {
      name: product.name,
      description: product.description,
      category: product.category,
      price: product.price,
      purchaseDate: product.date,
    };

    const { error } = await yupValidator(newProductSchema, dataToUpdate);
    if (error) return showMessage({ message: error, type: "danger" });

    const formData = new FormData();
    if (product.thumbnail) {
      formData.append("thumbnail", product.thumbnail);
    }
    type ProductInfoKeys = keyof typeof dataToUpdate;

    for (let key in product) {
      const value = dataToUpdate[key as ProductInfoKeys];
      if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    }
    const images: { uri: string; name: string; type: string }[] = [];
    product.images?.forEach((img, idx) => {
      if (!img.startsWith("https://res.cloudinary.com")) {
        images.push({
          name: `name_${idx}`,
          type: mime.getType(img) || "image/jpg",
          uri: img,
        });
      }
    });

    for (let img of images) {
      formData.append("images", img as any);
    }

    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.patch("/products/" + product.id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    );
    setBusy(false);
    if (res) {
      showMessage({
        message: res.message,
        type: "success",
      });
      navigation.navigate("listings");
    }
  };

  const makeSelectedImageAsThumbnail = () => {
    if (selectImg.startsWith("https://res.cloudinary.com")) {
      setProduct({ ...product, thumbnail: selectImg });
    }
    setShowImgOptions(false);
  };

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
          <TouchableOpacity
            onPress={OnImageSelection}
            style={styles.imageSelector}
          >
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
          <OptionSelector
            category={product.category}
            onPress={() => setShowCategoryModal(true)}
          />
          <FormInput
            placeholder="Description"
            value={product.description}
            onChangeText={(description) =>
              setProduct({ ...product, description })
            }
          />
          {!isFormChanged && (
            <AppButton
              isLoading={busy}
              title="Update Product"
              onPress={onSubmitHandler}
            >
              {busy && <LoadingSpinner />}
            </AppButton>
          )}
        </ScrollView>
      </View>
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
        renderItem={(option) => {
          return <Text style={styles.option}>{option.value}</Text>;
        }}
        onPress={({ id }) => {
          if (id === "thumb") makeSelectedImageAsThumbnail();
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
