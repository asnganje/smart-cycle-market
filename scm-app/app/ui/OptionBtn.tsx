import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/colors";
import { FC } from "react";

interface IOptionBtnProps {
  visible?: boolean,
  onPress?:()=>void
}

const OptionBtn: FC<IOptionBtnProps> = ({visible, onPress}) => {
  if(!visible) return null;
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="ellipsis-vertical-sharp"
        color={Colors.primary}
        size={20}
      />
    </TouchableOpacity>
  );
};
export default OptionBtn;
const styles = StyleSheet.create({});
