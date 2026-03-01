import { ScrollView, StyleSheet, View } from "react-native";
import WelcomeHeader from "../ui/WelcomeHeader";
import { s, vs } from "react-native-size-matters";
import FormInput from "../ui/FormInput";
import AppButton from "../ui/AppButton";
import FormDivider from "../ui/FormDivider";
import FormNavigator from "../ui/FormNavigator";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import KeyBoardAvoider from "../ui/KeyBoardAvoider";
import { AuthStackParamList } from "./navigator/auth/AuthNavigator";
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { signInSchema, yupValidator } from "../utils/validator";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { getAuthState } from "../store/auth";

const SignIn = () => {
  const {pending} = useSelector(getAuthState)
  const { signIn } = useAuth()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const changeHandler = (key: string) => (text: string) =>
    setUserInfo({ ...userInfo, [key]: text });

  const submitHandler = async () => {
    const { values, error } = await yupValidator(signInSchema, userInfo);
    if (error) {
      return showMessage({
        message: error,
        type: "danger",
      });
    }
    if(values) signIn(values)

  };

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const navigationHandler = (destination: string) => {
    if (destination === "signUp") {
      navigation.navigate("signUp");
    } else if (destination === "forgotPass") {
      navigation.navigate("forgotPass");
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
              value={email}
              onChangeText={changeHandler("email")}
              autoCapitalize="none"
            />
            <FormInput
              placeholder="Password"
              value={password}
              onChangeText={changeHandler("password")}
              secureTextEntry
            />
            <AppButton
              isLoading={pending}
              onPress={submitHandler}
              title={"Sign In"}
            >
              {pending && <LoadingSpinner/>}
            </AppButton>
            <FormDivider style={styles.formDivider} />
            <FormNavigator
              onPress={navigationHandler}
              destination1="forgotPass"
              destination2="signUp"
              title1="Forgot Password"
              title2="Sign Up"
            />
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
