import { AntDesign } from "@expo/vector-icons";
import { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { s } from "react-native-size-matters";
import { Colors } from "../../utils/colors";

interface IProfileOptionsProps {
  antIconName: string;
  title: string;
  onPress?: () => void;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

const ProfileOptionListItem: FC<IProfileOptionsProps> = ({
  onPress,
  active,
  style,
  title,
  antIconName,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <View style={styles.buttonContainer}>
        <AntDesign
          name={antIconName as any}
          size={24}
          color={active ? Colors.active : Colors.primary}
        />
        <Text
          style={[
            styles.title,
            { color: active ? Colors.active : Colors.primary },
          ]}
        >
          {title}
        </Text>
      </View>
      {active && <View style={styles.indicator} />}
    </TouchableOpacity>
  );
};
export default ProfileOptionListItem;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: s(10),
  },
  title: {
    fontSize: 20,
    paddingLeft: s(10),
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: s(10),
    height: s(10),
    borderRadius: s(5),
    backgroundColor: Colors.active,
  },
});
