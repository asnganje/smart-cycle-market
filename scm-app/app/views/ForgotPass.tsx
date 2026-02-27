import { ScrollView, StyleSheet, View } from "react-native";
import WelcomeHeader from "../ui/WelcomeHeader";
import { s, vs } from "react-native-size-matters";
import FormInput from "../ui/FormInput";
import AppButton from "../ui/AppButton";
import FormDivider from "../ui/FormDivider";
import FormNavigator from "../ui/FormNavigator";
import KeyBoardAvoider from "../ui/KeyBoardAvoider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "./navigator/auth/AuthNavigator";

const ForgotPass = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const navigationHandler = (destination: string) => {
    if (destination === "signUp") {
      navigation.navigate("signUp");
    } else if (destination === "signIn") {
      navigation.navigate("signIn");
    }
  };
  return (
    <KeyBoardAvoider>
      <ScrollView>
        <View style={styles.innerContainer}>
          <WelcomeHeader
            heading={"Online market place for used goods!"}
            subheading={
              "Buy or sell used goods with trust. Chat directly with sellers, ensuring seamless, authentic experience"
            }
          />
          <View style={styles.formContainer}>
            <FormInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <AppButton title={"Request link"} />
            <FormDivider style={styles.formDivider} />
            <FormNavigator
              onPress={navigationHandler}
              destination1="signUp"
              destination2="signIn"
              title1="Sign Up"
              title2="Sign In"
            />
          </View>
        </View>
      </ScrollView>
    </KeyBoardAvoider>
  );
};
export default ForgotPass;
const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    padding: s(15),
  },
  formContainer: {
    marginTop: vs(30),
  },
  formDivider: {
    width: "50%",
  },
});
