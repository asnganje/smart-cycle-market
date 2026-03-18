import { io } from "socket.io-client";
import client, { baseURL } from "../api/client";
import { Profile, updateAuthState } from "../store/auth";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { runAxiosAsync } from "../api/runAxiosAsync";
import * as SecureStore from "expo-secure-store";
import { Response } from "../hooks/useClient";

const socket = io(baseURL, { path: "/socket-message", autoConnect: false });

export const handleSocketConnection = (
  profile: Profile,
  dispatch: Dispatch<UnknownAction>,
) => {
  socket.auth = { token: profile.tokens.access };
  socket.connect();

  socket.on("connect_error", async (error) => {
    if (error.message === "jwt expired") {
      const refreshToken = await SecureStore.getItemAsync("refresh-token");
      const res = await runAxiosAsync<Response>(
        client.post(`${baseURL}/auth/refresh-token`, { refreshToken }),
      );

      if (res) {
        await SecureStore.setItemAsync("access-token", res.tokens.access);
        await SecureStore.setItemAsync("refresh-token", res.tokens.refresh);
        dispatch(
          updateAuthState({
            profile: {
              ...profile!,
              tokens: {
                access: res.tokens.access,
                refresh: res.tokens.refresh,
              },
            },
            pending: false,
          }),
        );
        socket.auth = {token: res.tokens.access}
        socket.connect()
      }
    }
  });
};

export default socket;
