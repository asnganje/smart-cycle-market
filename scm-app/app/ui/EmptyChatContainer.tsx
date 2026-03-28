import { StyleSheet, Text, View } from "react-native";
import size from "../utils/size";
import { Colors } from "../utils/colors";
const EmptyChatContainer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          Breaking the ice can be the hardest part, but trust me, it's worth it!
          Start with a simple 'hello' and watch the conversation unfold.
        </Text>
      </View>
    </View>
  );
};
export default EmptyChatContainer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: size.padding,
    transform: [{ rotate: "180deg" }],
  },
  messageContainer:{
    backgroundColor: Colors.deActive,
    padding: size.padding,
    borderRadius:5
  },
  message:{
    color: Colors.active,
    fontSize:12,
    textAlign:"center"
  }
});
