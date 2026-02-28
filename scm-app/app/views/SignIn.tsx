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
import { runAxiosAsync } from "../api/runAxiosAsync";
import client from "../api/client";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/auth";
import * as SecureStore from "expo-secure-store"


export interface SignInRes {
  profile: {
        id: string,
        email: string,
        name: string,
        tokens: {
            refresh:string,
            access: string
        }
    }
}

const SignIn = () => {
  const [busy, setBusy] = useState(false);
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInfo;
  const changeHandler = (key: string) => (text: string) =>
    setUserInfo({ ...userInfo, [key]: text });

  const submitHandler = async () => {
    setBusy(true);
    const { values, error } = await yupValidator(signInSchema, userInfo);
    if (error) {
      setBusy(false);
      return showMessage({
        message: error,
        type: "danger",
      });
    }

    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/login", values),
    );
    if (res) {
      await SecureStore.setItemAsync("access-token", res.profile.tokens.access)
      await SecureStore.setItemAsync("refresh-token", res.profile.tokens.refresh)
      dispatch(updateAuthState({profile:res.profile, pending:false}))     
      showMessage({
        message: "Login successful",
        type: "success",
      });
    }
    setBusy(false);
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
              isLoading={busy}
              onPress={submitHandler}
              title={"Sign In"}
            >
              {busy && <LoadingSpinner/>}
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
