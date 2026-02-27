import { FC } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import WelcomeHeader from "../ui/WelcomeHeader";
import { s, vs } from "react-native-size-matters";
import { Colors } from "../utils/colors";
import FormInput from "../ui/FormInput";
import AppButton from "../ui/AppButton";
import FormDivider from "../ui/FormDivider";

interface ISignInProps {
  name: string;
}

const SignIn: FC<ISignInProps> = ({ name }) => {
  return (
    <View style={styles.container}>
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
        <FormInput
          placeholder="Password"
          secureTextEntry
        />
        <AppButton>Sign in</AppButton>
        <FormDivider style={styles.formDivider}/>
      </View>
    </View>
  );
};
export default SignIn;
const styles = StyleSheet.create({
  container: {
    padding: s(15),
  },
  formContainer: {
    marginTop: vs(30),
  },
  formDivider:{
    width:"50%"
  }
});
