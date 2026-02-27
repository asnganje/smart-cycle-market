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
import axios from "axios";
import LoadingSpinner from "../ui/LoadingSpinner";
import { NewUserSchema, yupValidator } from "../utils/validator";
import { runAxiosAsync } from "../api/runAxiosAsync";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = userInfo;
  const changeHandler = (key: string) => (text: string) =>
    setUserInfo({ ...userInfo, [key]: text });

  const submitHandler = async () => {
    setIsLoading(true);
    const { values, error } = await yupValidator(NewUserSchema, userInfo);
    const res = await runAxiosAsync<{ message: string }>(
      axios.post("http://10.56.22.118:3000/auth/sign-up", values),
    );
    console.log(res);
    setIsLoading(false);
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
              value={userInfo.name}
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
              isLoading={isLoading}
              title={"Sign Up"}
              onPress={submitHandler}
            >
              {isLoading && <LoadingSpinner />}
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
