import { StyleSheet, Text, View } from 'react-native'
import AppHeader from './components/AppHeader'
import BackButton from '../ui/BackButton'
const Listings = () => {
  return (
    <View>
      <AppHeader backButton={<BackButton />}/>
      <Text>Listings</Text>
    </View>
  )
}
export default Listings
const styles = StyleSheet.create({})