import { Modal, StyleSheet, View } from "react-native";
import { Colors } from "../utils/colors";
import LottieView from "lottie-react-native";
import { FC } from "react";

interface LoadingSpinnerProps {
  visible:boolean
}

const LoadingSpinnerAnimate: FC<LoadingSpinnerProps> = ({visible}) => {
  if(!visible) return null
  return (
    <Modal animationType="fade" transparent>
      <View style={styles.container}>
        <LottieView
          source={require("../../assets/loading2.json")}
          autoPlay
          loop
          style={{ flex: 1, transform:[{scale: 0.5}] }}
        />
      </View>
    </Modal>
  );
};
export default LoadingSpinnerAnimate;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backDrop,
  },
});
