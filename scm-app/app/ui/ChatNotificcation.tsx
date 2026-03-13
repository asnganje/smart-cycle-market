import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { FC } from "react";
import { Colors } from "../utils/colors";
import size from "../utils/size";
import { s } from "react-native-size-matters";

interface IChatNotificationProps {
  indicate?: boolean;
  onPress?(): void;
}

const ChatNotification: FC<IChatNotificationProps> = ({
  indicate,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons
        name="message"
        size={24}
        color={indicate ? Colors.active : Colors.primary}
      />
      {indicate && <View style={styles.indicator}/>}
    </TouchableOpacity>
  );
};
export default ChatNotification;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: size.padding,
    alignSelf:"flex-end",
    position:"relative"
  },
  indicator:{
    width:s(10),
    height:s(10),
    backgroundColor: Colors.active,
    borderRadius:s(5),
    position:"absolute",
    top:0,
    right:s(13),
    borderWidth:s(2),
    borderColor:Colors.white

  }
});
