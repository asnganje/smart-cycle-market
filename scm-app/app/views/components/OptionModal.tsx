import { FC, JSX } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../utils/colors";
import { s, vs } from "react-native-size-matters";

interface OptionModalProps <T> {
  visible: boolean;
  onRequestClose: (state: boolean) => void;
  options: T[],
  renderItem(item: T): JSX.Element,
  onPress(item: T): void
}

const OptionModal = <T extends unknown>({ visible, onRequestClose, options, onPress, renderItem }: OptionModalProps<T>) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => onRequestClose(!visible)}
    >
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView>
            {
              options.map((item, index) => {
                return <TouchableOpacity  key={index} onPress={()=>onPress(item)}>
                  {renderItem(item)}
                </TouchableOpacity>
              })
            }
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};
export default OptionModal;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems:"center",
    justifyContent:"center",
    padding:s(15),
    backgroundColor:Colors.backDrop
  },
  innerContainer: {
    backgroundColor: Colors.deActive,
    width:"100%",
    padding: s(10),
    borderRadius: s(7),
    maxHeight: vs(200),
  },
});
