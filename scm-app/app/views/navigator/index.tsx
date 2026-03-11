import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { Colors } from "../../utils/colors";
import AuthNavigator from "./auth/AuthNavigator";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../../store/auth";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { runAxiosAsync } from "../../api/runAxiosAsync";
import LoadingSpinnerAnimate from "../../ui/LoadingSpinnerAnimate";
import useAuth from "../../hooks/useAuth";
import TabNavigator from "./tab/TabNavigator";
import useClient from "../../hooks/useClient";

export type ProfileRes = {
  profile: {id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: {id:string, url:string}
  }
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Colors.white,
  },
};

const Navigator = () => {
  const dispatch = useDispatch();
  const {isLoggedIn, authState} = useAuth()
  const {authClient} = useClient()
  const fetchProfile = async () => {
    // await SecureStore.deleteItemAsync("refresh-token")
    // await SecureStore.deleteItemAsync("access-token")
    const accessToken = await SecureStore.getItemAsync("access-token");
    if (accessToken) {
      dispatch(updateAuthState({ pending: true, profile: null }));
      const res = await runAxiosAsync<ProfileRes>(
        authClient.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
      if (res) {
        dispatch(updateAuthState({ pending: false, profile: {...res.profile, tokens:{access: accessToken, refresh:"" } }}));
      } else {
        dispatch(updateAuthState({pending:false, profile:null}))
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <NavigationContainer theme={MyTheme}>
      <LoadingSpinnerAnimate visible={authState.pending} />
      {!isLoggedIn ? <AuthNavigator /> :  <TabNavigator />}
    </NavigationContainer>
  );
};
export default Navigator;
