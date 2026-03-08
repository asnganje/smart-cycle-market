import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../utils/colors'
const BackButton = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="chevron-back" size={24} color={Colors.active}/>
      <Text style={styles.title}>Go Back</Text>
    </View>
  )
}
export default BackButton
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:"center"
  },
  title:{
    color:Colors.active
  }
})