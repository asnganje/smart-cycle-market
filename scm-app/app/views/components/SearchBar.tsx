import { StyleSheet, Text, TextInput, View } from 'react-native'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { Colors } from '../../utils/colors';
import { s } from 'react-native-size-matters';


const SearchBar = () => {
  return (
    <View style={styles.container}>
      <EvilIcons name="search" size={24} color={Colors.primary} />
      <TextInput style={styles.textInput} placeholder="Search here..." />
    </View>
  )
}
export default SearchBar
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderRadius:s(4),
    borderColor: Colors.primary,
    paddingHorizontal: s(4)
  },
  textInput:{
    paddingLeft: s(8),
    flex:1,
    color: Colors.primary,
    fontSize: s(15)
  }

})