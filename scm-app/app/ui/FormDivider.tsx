import { FC } from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import { vs } from 'react-native-size-matters'

interface IFormDivider {
  style: ViewStyle
}

const FormDivider: FC<IFormDivider> = ({style}) => {
  return (
    <View style={[styles.container, style]} />
  )
}
export default FormDivider
const styles = StyleSheet.create({
  container:{
    alignSelf:"center",
    marginVertical:vs(25),
    borderWidth:vs(0.5)
  }
})