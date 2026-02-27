import { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import WelcomeHeader from "../ui/WelcomeHeader";
import { s, vs } from "react-native-size-matters";
import { Colors } from "../utils/colors";
import FormInput from "../ui/FormInput";
import AppButton from "../ui/AppButton";
import FormDivider from "../ui/FormDivider";
import FormNavigator from "../ui/FormNavigator";
import KeyBoardAvoider from "../ui/KeyBoardAvoider";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "./navigator/auth/AuthNavigator";


const SignUp = () => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>()

  const navigationHandler = (destination: string) => {
    if(destination === "forgotPass") {
      navigation.navigate("forgotPass")
    } else if(destination === "signIn") {
      navigation.navigate("signIn")
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
              placeholder="Name"
            />
            <FormInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput placeholder="Password" secureTextEntry />
            <AppButton title={"Sign Up"}/>
            <FormDivider style={styles.formDivider} />
            <FormNavigator onPress={navigationHandler} destination1="forgotPass" destination2="signIn" title1="Forgot Password" title2="Sign In"/>
          </View>
        </View>
      </ScrollView>
    </KeyBoardAvoider>

  );
};
export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
