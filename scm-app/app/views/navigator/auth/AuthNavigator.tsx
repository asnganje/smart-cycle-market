import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../../SignIn";
import SignUp from "../../SignUp";
import ForgotPass from "../../ForgotPass";

export type AuthStackParamList = {
  signIn: undefined;
  signUp: undefined;
  forgotPass: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="signUp" component={SignUp} />
      <Stack.Screen name="forgotPass" component={ForgotPass} />
    </Stack.Navigator>
  );
};
export default AuthNavigator;
