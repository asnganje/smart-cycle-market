import { StyleSheet, Text, View } from 'react-native'
import AppButton from './AppButton'
import { Colors } from '../utils/colors'
import { FC } from 'react'

interface IFormNavigatorProps {
  title1: string,
  title2: string,
  destination1:string,
  destination2:string,
  onPress:(destination:string)=>void
}
const FormNavigator: FC<IFormNavigatorProps> = ({onPress, destination1, destination2, title1, title2}) => {
  return (
    <View style={styles.container}>
      <AppButton onPress={()=>onPress(destination1)} textStyle={styles.text} style={styles.btnStyle} title={title1}/>
      <AppButton onPress={()=>onPress(destination2)} textStyle={styles.text} style={styles.btnStyle} title={title2}/> 
    </View>
  )
}
export default FormNavigator
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  btnStyle:{
    backgroundColor:"transparent",
  },
  text:{
    color:Colors.gray,
    padding:0,
    letterSpacing:0
  }
})