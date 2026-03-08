import { StyleSheet, Text, View } from 'react-native'
import AppHeader from './components/AppHeader'
import BackButton from '../ui/BackButton'
const Chats = () => {
  return (
    <View>
      <AppHeader backButton={<BackButton />}/>
      <Text>Chats</Text>
    </View>
  )
}
export default Chats
const styles = StyleSheet.create({})