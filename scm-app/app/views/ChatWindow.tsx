import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./navigator/app/AppNavigator";
import { FC } from "react";
import PeerProfile from "../ui/PeerProfile";
import { GiftedChat } from "react-native-gifted-chat";

type ChatWindowProps = NativeStackScreenProps<AppStackParamList, "chatWindow">;
const ChatWindow: FC<ChatWindowProps> = ({ route }) => {
  const { conversationId, peerProfile } = route.params;

  return (
    <View>
      <AppHeader
        backButton={<BackButton />}
        center={<PeerProfile avatar={peerProfile.avatar} name={peerProfile.name}/>}
      />
      <GiftedChat messages={[]}/>
    </View>
  );
};
export default ChatWindow;
const styles = StyleSheet.create({});
