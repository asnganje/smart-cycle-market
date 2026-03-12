import { FC } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "../utils/colors";

interface IAvatarViewProps {
  uri?: string;
  size?: number;
  onPress?:()=>void;
}

const iconContainerFactor = 0.7;
const iconSizeFactor = 0.8;

const AvatarView: FC<IAvatarViewProps> = ({ uri, onPress, size = 50 }) => {
  const iconContainerSize = size * iconContainerFactor;
  const iconSize = size * iconSizeFactor;
  return (
    <TouchableOpacity
    onPress={onPress}
      style={[
        { width: size, height: size, borderRadius: size / 2 },
        styles.container,
        !uri && styles.profileIcon,
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.flex1} />
      ) : (
        <View
          style={[
            {
              width: iconContainerSize,
              height: iconContainerSize,
              borderRadius: iconContainerSize / 2,
            },
            styles.iconContainer,
          ]}
        >
          <FontAwesome name="user" size={iconSize} color={Colors.white} />
        </View>
      )}
    </TouchableOpacity>
  );
};
export default AvatarView;
const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  flex1: {
    flex: 1,
  },
  profileIcon: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});
