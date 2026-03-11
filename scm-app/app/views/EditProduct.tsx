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

type EditProductProps = NativeStackScreenProps<
  ProfileNavigatorParamList,
  "editProduct"
>;

const imageOptions = [
  {value: "Use as Thumbnail", id: "thumb"},
  {value: "Remove Image", id: "remove"}
]

const EditProduct: FC<EditProductProps> = ({ route }) => {
  const [selectImg, setSelectImg] = useState("")
  const [showImgOptions, setShowImgOptions] = useState(false)
  const { product } = route.params;

  const onLongPress = (image: string) => {
    setShowImgOptions(true)
    setSelectImg(image)
  }

  const onRemoveSelectedImg = () => {
    console.log(selectImg);    
  }

  return (
    <>
      <AppHeader backButton={<BackButton />} />
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Images</Text>
          <HorizontalImageList data={product.images || []} onLongPress={onLongPress} />
          <TouchableOpacity style={styles.imageSelector}>
            <FontAwesome5 name="images" size={30} color={Colors.primary} />
          </TouchableOpacity>
          <FormInput placeholder="Product name" value={product.name} />
          <FormInput
            placeholder="Price"
            keyboardType="numeric"
            value={product.price.toString()}
          />
          <DatePicker
            title="Purchase date: "
            value={new Date(product.date)}
            onChange={(date)=>{
            }}
          />
          <OptionSelector category={product.category} onPress={()=>{}}/>
          <FormInput placeholder="Description" />
        </ScrollView>
      </View>
      <OptionModal 
        options={imageOptions}
        renderItem={(option)=> {
          return <Text style={styles.option}>{option.value}</Text>
        }}
        onPress={({id})=>{
          if(id === "thumb"){}
          if(id === "remove"){
            onRemoveSelectedImg()
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
  option:{
    paddingVertical:vs(10),
    color:Colors.primary
  }
});
