import { useDispatch, useSelector } from "react-redux";
import client from "../api/client";
import { runAxiosAsync } from "../api/runAxiosAsync";
import * as SecureStore from "expo-secure-store";
import { getAuthState, updateAuthState } from "../store/auth";
import { showMessage } from "react-native-flash-message";
import useClient from "./useClient";

type UserInfo = {
  email: string;
  password: string;
};

export interface SignInRes {
  profile: {
    id: string;
    email: string;
    name: string;
    avatar: string;
    tokens: {
      refresh: string;
      access: string;
    };
  };
}

const useAuth = () => {
  const dispatch = useDispatch();
  const authState = useSelector(getAuthState);
  const { authClient } = useClient();

  const isLoggedIn = authState.profile ? true : false;

  const signIn = async (userInfo: UserInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }));
    const res = await runAxiosAsync<SignInRes>(
      client.post("/auth/login", userInfo),
    );
    if (res) {
      await SecureStore.setItemAsync("access-token", res.profile.tokens.access);
      await SecureStore.setItemAsync(
        "refresh-token",
        res.profile.tokens.refresh,
      );
      dispatch(
        updateAuthState({
          profile: {
            ...res.profile,
            tokens: {
              refresh: res.profile.tokens.refresh,
              access: res.profile.tokens.access,
            },
          },
          pending: false,
        }),
      );
      showMessage({
        message: "Login successful",
        type: "success",
      });
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  const signOut = async () => {
    const token = await SecureStore.getItemAsync("refresh-token");
    if (token) {
      dispatch(updateAuthState({ profile: authState.profile, pending: true }));
      await runAxiosAsync(
        authClient.post("/auth/sign-out", { refreshToken: token }),
      );

      await SecureStore.deleteItemAsync("refresh-token");
      await SecureStore.deleteItemAsync("access-token");
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  return { signIn, authState, isLoggedIn, signOut };
};

export default useAuth;
