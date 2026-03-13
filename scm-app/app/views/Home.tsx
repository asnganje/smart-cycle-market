import { StyleSheet, Text, View } from "react-native";
import ChatNotification from "../ui/ChatNotificcation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppStackParamList } from "./navigator/app/AppNavigator";

const Home = () => {
  const {navigate} = useNavigation<NavigationProp<AppStackParamList>>()
  return (
    <>
      <ChatNotification onPress={()=>navigate("chats")}/>
      <View>
        <Text>Home</Text>
      </View>
    </>
  );
};
export default Home;
const styles = StyleSheet.create({});
