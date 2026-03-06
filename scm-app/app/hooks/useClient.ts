import axios from "axios";
import { baseURL } from "../api/client";
import useAuth from "./useAuth";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import * as SecureStore from "expo-secure-store";
import { runAxiosAsync } from "../api/runAxiosAsync";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/auth";

type Response = {
  tokens: {
    refresh: string;
    access: string;
  };
};

const authClient = axios.create({ baseURL: baseURL });

const useClient = () => {
  const { authState } = useAuth();
  const dispatch = useDispatch();
  
  const token = authState.profile?.tokens?.access;
  authClient.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const refreshAuthLogic = async (failedRequest: any) => {
    const refreshToken = await SecureStore.getItemAsync("refresh-token");    
    const options = {
      method: "POST",
      data: { refreshToken },
      url: `${baseURL}/auth/refresh-token`,
    };
    
    const res = await runAxiosAsync<Response>(axios(options));    
    if (res?.tokens) {
      failedRequest.response.config.headers.Authorization = `Bearer ${res.tokens.access}`;
      await SecureStore.setItemAsync("access-token", res.tokens.access);
      await SecureStore.setItemAsync("refresh-token", res.tokens.refresh);
      dispatch(
        updateAuthState({
          profile: {
            ...authState.profile!,
            tokens: { access: res.tokens.access, refresh: res.tokens.refresh },
          },
          pending: false,
        }),
      );
      return Promise.resolve();
    }
    return Promise.reject();
  };
  createAuthRefreshInterceptor(authClient, refreshAuthLogic);
  return { authClient };
};

export default useClient;
