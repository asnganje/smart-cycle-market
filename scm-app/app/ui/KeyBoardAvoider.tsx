import { FC, ReactNode } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface IKeyboardAvoiderProps {
  children: ReactNode;
}
const KeyBoardAvoider: FC<IKeyboardAvoiderProps> = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={50}
    >
      {children}
    </KeyboardAvoidingView>
  );
};
export default KeyBoardAvoider;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
