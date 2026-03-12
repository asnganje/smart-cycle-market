import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AvatarView from "../ui/AvatarView";
import useAuth from "../hooks/useAuth";
import { Colors } from "../utils/colors";
import { s, vs } from "react-native-size-matters";
import size from "../utils/size";
import FormDivider from "../ui/FormDivider";
import ProfileOptionListItem from "./components/ProfileOptionListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { runAxiosAsync } from "../api/runAxiosAsync";
import useClient from "../hooks/useClient";
import { ProfileRes } from "./navigator";
import { useDispatch } from "react-redux";
import { updateAuthState } from "../store/auth";
import { showMessage } from "react-native-flash-message";

const Profile = () => {
  const { authState, signOut } = useAuth();
  const { profile } = authState;
  const { authClient } = useClient();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(profile?.name || "");
  const [busy, setBusy] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const isNameChanged =
    profile?.name !== userName && userName.trim().length >= 3;

  const { navigate } =
    useNavigation<NavigationProp<ProfileNavigatorParamList>>();
  const onMessagePress = () => {
    navigate("chats");
  };

  const onListingPress = () => {
    navigate("listings");
  };

  const getVerificationLink = async () => {
    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      authClient.get("/auth/verify-token"),
    );
    setBusy(false);
    if (res) {
      showMessage({
        message: res.message,
        type: "success",
      });
    }
  };

  const fetchProfile = async () => {
    setRefresh(true)
    const res = await runAxiosAsync<{profile: ProfileRes}>(authClient.get("/auth/profile"))
    setRefresh(false)
    if(res) {
      dispatch(updateAuthState({profile:{...profile!, ...res.profile}, pending: false}))
    }
  }

  const updateProfile = async () => {
    const res = await runAxiosAsync<{ profile: ProfileRes }>(
      authClient.patch("/auth/update-profile", { name: userName }),
    );
    if (res) {
      showMessage({
        message: "Name successfully updated!",
        type: "success",
      });
      dispatch(
        updateAuthState({
          profile: { ...profile!, ...res.profile },
          pending: false,
        }),
      );
    }
  };
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refresh} onRefresh={fetchProfile}/>} contentContainerStyle={styles.container}>
      {!profile?.verified && (
        <View style={styles.verificationLinkContainer}>
          <Text style={styles.title}>
            It looks like your profile is not verified!
          </Text>
          {busy ? (
            <Text style={styles.link}>Please wait...</Text>
          ) : (
            <Text style={styles.link} onPress={getVerificationLink}>
              Tap here to verify!
            </Text>
          )}
        </View>
      )}
      <View style={styles.profileContainer}>
        <AvatarView size={80} uri={profile?.avatar} />
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            <TextInput
              value={userName}
              onChangeText={(text) => {
                setUserName(text);
              }}
              style={styles.name}
            />
            {isNameChanged && (
              <TouchableOpacity onPress={updateProfile}>
                <AntDesign name="check" size={24} color={Colors.primary} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.email}>{profile?.email}</Text>
        </View>
      </View>
      <FormDivider style={styles.fDivider} />
      <ProfileOptionListItem
        antIconName="message"
        active
        title="Messages"
        onPress={onMessagePress}
        style={styles.profileOptionMarginB}
      />
      <ProfileOptionListItem
        antIconName="appstore"
        title="Your listings"
        onPress={onListingPress}
        style={styles.profileOptionMarginB}
      />
      <ProfileOptionListItem
        antIconName="logout"
        title="Logout"
        onPress={signOut}
      />
    </ScrollView>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    padding: size.padding,
  },
  name: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: Colors.primary,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    flex: 1,
    paddingLeft: size.padding,
  },
  fDivider: {
    width: "80%",
  },
  profileOptionMarginB: {
    marginBottom: vs(10),
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  verificationLinkContainer: {
    padding: vs(10),
    backgroundColor: Colors.deActive,
    marginVertical: vs(10),
    borderRadius: s(5),
  },
  title: {
    fontWeight: "600",
    color: Colors.primary,
    textAlign: "center",
  },
  link: {
    fontWeight: "600",
    color: Colors.active,
    textAlign: "center",
    paddingTop: vs(5),
  },
});
