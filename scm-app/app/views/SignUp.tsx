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
import { useState } from "react";
import LoadingSpinner from "../ui/LoadingSpinner";
import { NewUserSchema, yupValidator } from "../utils/validator";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { showMessage } from "react-native-flash-message";
import client from "../api/client";
import useAuth from "../hooks/useAuth";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [busy, setBusy] = useState(false)

  const {signIn} = useAuth()
  const { name, email, password } = userInfo;
  const changeHandler = (key: string) => (text: string) =>
    setUserInfo({ ...userInfo, [key]: text });

  const submitHandler = async () => {
    const { values, error } = await yupValidator(NewUserSchema, userInfo);
    if (error) {
      return showMessage({
        message: error,
        type: "danger",
      });
    }
    setBusy(true)
    const res = await runAxiosAsync<{ message: string }>(
      client.post("/auth/sign-up", values),
    );
    if (res?.message) {
      setBusy(false)
      showMessage({ message: res.message, type: "success" });
      signIn(values!)
    }
  };

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const navigationHandler = (destination: string) => {
    if (destination === "forgotPass") {
      navigation.navigate("forgotPass");
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
              placeholder="Name"
              value={name}
              onChangeText={changeHandler("name")}
            />
            <FormInput
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={changeHandler("email")}
            />
            <FormInput
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={changeHandler("password")}
            />
            <AppButton
              isLoading={busy}
              title={"Sign Up"}
              onPress={submitHandler}
            >
              {busy && <LoadingSpinner />}
            </AppButton>
            <FormDivider style={styles.formDivider} />
            <FormNavigator
              onPress={navigationHandler}
              destination1="forgotPass"
              destination2="signIn"
              title1="Forgot Password"
              title2="Sign In"
            />
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
