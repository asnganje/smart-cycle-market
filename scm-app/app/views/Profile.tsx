import {
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
import { vs } from "react-native-size-matters";
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
  const {authClient} = useClient()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState(profile?.name || "");
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

  const updateProfile = async () => {
    const res = await runAxiosAsync<{profile: ProfileRes}>(authClient.patch("/auth/update-profile", {name: userName}))
    if (res) {
      showMessage({
        message:"Name successfully updated!",
        type:"success"
      })
      dispatch(updateAuthState({profile: {...profile!, ...res.profile}, pending: false}))
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
});
