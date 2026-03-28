import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import AvatarView from "./AvatarView";
import { Colors } from "../utils/colors";

interface IPeerProfileProps {
  name?: string;
  avatar?: string;
}

const PeerProfile: FC<IPeerProfileProps> = ({ name, avatar }) => {
  return (
    <View style={styles.container}>
      <AvatarView size={34} uri={avatar} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};
export default PeerProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: s(20),
    flexDirection: "row",
    alignItems: "center",
  },
  name:{
    color: Colors.primary,
    paddingLeft: s(5),
    fontWeight:"600"
  }
});
