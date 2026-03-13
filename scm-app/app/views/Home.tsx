import { StyleSheet, Text, View } from "react-native";
import ChatNotification from "../ui/ChatNotificcation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "./navigator/app/AppNavigator";
import SearchBar from "./components/SearchBar";
import size from "../utils/size";
import CategoryList from "./components/CategoryList";

const Home = () => {
  const { navigate } = useNavigation<NavigationProp<AppStackParamList>>();
  return (
    <>
      <ChatNotification onPress={() => navigate("chats")} />
      <View style={styles.container}>
        <SearchBar />
        <CategoryList onPress={()=>navigate("productList")} />
      </View>
    </>
  );
};
export default Home;
const styles = StyleSheet.create({
  container:{
    padding:size.padding,
    flex:1
  }
});
