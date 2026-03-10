import { StyleSheet, Text, View } from 'react-native'
import AppHeader from './components/AppHeader'
import BackButton from '../ui/BackButton'
const ChatWindow = () => {
  return (
    <View>
      <AppHeader backButton={<BackButton />}/>
    </View>
  )
}
export default ChatWindow
const styles = StyleSheet.create({})