import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./components/AppHeader";
import BackButton from "../ui/BackButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "./navigator/app/AppNavigator";
import { FC } from "react";
import PeerProfile from "../ui/PeerProfile";
import { Avatar, GiftedChat } from "react-native-gifted-chat";
import useAuth from "../hooks/useAuth";
import EmptyChatContainer from "../ui/EmptyChatContainer";

type ChatWindowProps = NativeStackScreenProps<AppStackParamList, "chatWindow">;
const ChatWindow: FC<ChatWindowProps> = ({ route }) => {
  const { conversationId, peerProfile } = route.params;
  const { authState } = useAuth();
  const profile = authState.profile;

  if(!profile) return null

  return (
    <View style={styles.container}>
      <AppHeader
        backButton={<BackButton />}
        center={
          <PeerProfile avatar={peerProfile.avatar} name={peerProfile.name} />
        }
      />
      <GiftedChat
        messages={[]}
        user={{
          _id: profile.id,
          name: profile?.name,
          avatar: profile?.avatar
        }}
        onSend={(messages) => {
          console.log(messages);
        }}
        renderChatEmpty={()=><EmptyChatContainer/>}
      />
    </View>
  );
};
export default ChatWindow;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
