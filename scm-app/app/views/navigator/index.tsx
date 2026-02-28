import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Colors } from "../../utils/colors";
import AuthNavigator from "./auth/AuthNavigator";
import AppNavigator from "./app/AppNavigator";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, Profile, updateAuthState } from "../../store/auth";
import { useEffect } from "react";
import client from "../../api/client";
import * as SecureStore from "expo-secure-store";
import { runAxiosAsync } from "../../api/runAxiosAsync";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  const { pending, profile } = useSelector(getAuthState);
  const dispatch = useDispatch()
  const isLoggedIn = profile ? true : false;

  const fetchProfile = async () => {
    const accessToken = await SecureStore.getItemAsync("access-token");
    if (accessToken) {
    const res = await runAxiosAsync<{profile: Profile}>(client.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }));
      if(res) {
        dispatch(updateAuthState({pending:false, profile: res.profile}))
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      {!isLoggedIn ? <AuthNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};
export default Navigator;
