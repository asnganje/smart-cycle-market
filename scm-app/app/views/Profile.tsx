import { ScrollView, StyleSheet, Text, View } from "react-native";
import AvatarView from "../ui/AvatarView";
import useAuth from "../hooks/useAuth";
import { Colors } from "../utils/colors";
import { vs } from "react-native-size-matters";
import size from "../utils/size";
import FormDivider from "../ui/FormDivider";
import ProfileOptionListItem from "./components/ProfileOptionListItem";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ProfileNavigatorParamList } from "./navigator/profile/ProfileNavigator";
const Profile = () => {
  const { authState, signOut } = useAuth();
  const { profile } = authState;
  const {navigate} = useNavigation<NavigationProp<ProfileNavigatorParamList>>()
  const onMessagePress = () => {
    navigate("chats")
  }

  const onListingPress = () => {
    navigate("listings")
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <AvatarView size={80} uri={profile?.avatar} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>{profile?.name}</Text>
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
      <ProfileOptionListItem antIconName="logout" title="Logout" onPress={signOut}/>
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
    paddingTop: vs(2),
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
});
