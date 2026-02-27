import { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { s } from "react-native-size-matters";
import { Colors } from "../utils/colors";

interface IWelcomeHeaderProps {
  heading: string,
  subheading: string
}

const WelcomeHeader: FC<IWelcomeHeaderProps> = ({heading, subheading}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/hero.png")}
        resizeMode="contain"
        resizeMethod="resize"
      />
      <Text style={styles.heading}>{heading}</Text>
      <Text style={styles.subheading}>{subheading}</Text>
    </View>
  );
};
export default WelcomeHeader;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  img: {
    height: s(200),
    width: s(250),
  },
  heading:{
    fontWeight:"600",
    fontSize:s(20),
    textAlign:"center",
    letterSpacing:s(1),
    marginBottom:s(10),
    color:Colors.primary
  },
  subheading:{
    fontSize:s(12),
    textAlign:"center",
    lineHeight:s(20),
    color:Colors.primary
  }
});
