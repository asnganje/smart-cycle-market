import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/colors";
import { s } from "react-native-size-matters";
import { FC } from "react";
import LottieView from "lottie-react-native";

interface IChatIconProps {
  onPress?(): void;
  busy: boolean;
}

const ChatIcon: FC<IChatIconProps> = ({ busy, onPress }) => {
  if (busy) {
    return (
      <View style={styles.common}>
        <View style={styles.flex1}>
          <LottieView
            style={styles.flex1}
            autoPlay
            loop
            source={require("../../../assets/loading_2.json")}
          />
        </View>
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.messageBtn, styles.common]}
    >
      <AntDesign name="message" size={20} color={Colors.white} />
    </TouchableOpacity>
  );
};
export default ChatIcon;
const styles = StyleSheet.create({
  common: {
    position: "absolute",
    width: s(50),
    height: s(50),
    right: s(20),
    bottom: s(20),
  },
  messageBtn: {
    borderRadius: s(25),
    backgroundColor: Colors.active,
    justifyContent: "center",
    alignItems: "center"
  },
  flex1: {
    flex: 1,
  },
});
