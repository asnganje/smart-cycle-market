import { FC, ReactNode } from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { s } from 'react-native-size-matters'
import { Colors } from '../utils/colors'

interface IAppButtonProps {
  style?: ViewStyle,
  children: ReactNode,
  isLoading?:boolean,
  title:string,
  textStyle?:TextStyle,
  onPress?:()=>void
}

const AppButton: FC<IAppButtonProps> = ({title, style, isLoading, textStyle, children, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btnContainer, style]}>
      {!isLoading && <Text style={[styles.btnText, textStyle]}>{title}</Text>}
      {children}
    </TouchableOpacity>
  )
}
export default AppButton
const styles = StyleSheet.create({
  btnContainer:{
    padding: s(10),
    borderRadius:s(5),
    alignItems:"center",
    backgroundColor:Colors.primary,
  },
  btnText:{
    color:Colors.white,
    fontWeight:"700",
    letterSpacing:1
  }
})