import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FormInput from '../ui/FormInput'
import { s, vs } from 'react-native-size-matters'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '../utils/colors';
import DatePicker from '../ui/DatePicker';

const NewListing = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity >
        <View style={styles.iconContainer}>

          <FontAwesome5 name="images" size={24} color="black" />
        </View>
          <Text style={styles.btnTitle}>Add images</Text>
      </TouchableOpacity>
      <FormInput placeholder="Product name"/>
      <FormInput placeholder="Price"/>
      <DatePicker title="Purchase date: " value={new Date()} onChange={()=>{}}/>
      <FormInput placeholder="Description"/>
    </View>
  )
}
export default NewListing
const styles = StyleSheet.create({
  container:{
    padding:s(15)
  },
  fileSelector:{
    alignItems:"center",
    justifyContent:"center",
  },
  btnTitle:{
    color:Colors.primary,
    marginBottom:vs(20)
  },
  iconContainer:{
    alignItems:"center",
    justifyContent:"center",
    marginBottom:vs(4),
    width:s(70),
    height:s(70),
    borderWidth:2,
    borderColor:Colors.primary,
    borderRadius:s(5)
  }
})