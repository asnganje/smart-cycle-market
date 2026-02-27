import {
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import WelcomeHeader from "../ui/WelcomeHeader";
import { s, vs } from "react-native-size-matters";
import FormInput from "../ui/FormInput";
import AppButton from "../ui/AppButton";
import FormDivider from "../ui/FormDivider";
import FormNavigator from "../ui/FormNavigator";
import { useNavigation } from "@react-navigation/native";
import KeyBoardAvoider from "../ui/KeyBoardAvoider";

const SignIn = () => {
  const navigation = useNavigation();

  const navigationHandler = (destination: string) => {
    if(destination === "signUp") {
      navigation.navigate("signUp")
    } else if(destination === "forgotPass") {
      navigation.navigate("forgotPass")
    }
  }
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
            <FormInput placeholder="Password" secureTextEntry />
            <AppButton title={"Sign In"} />
            <FormDivider style={styles.formDivider} />
            <FormNavigator onPress={navigationHandler} destination1="forgotPass" destination2="signUp" title1="Forgot Password" title2="Sign Up"/>
          </View>
        </View>
      </ScrollView>
    </KeyBoardAvoider>
  );
};
export default SignIn;
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
