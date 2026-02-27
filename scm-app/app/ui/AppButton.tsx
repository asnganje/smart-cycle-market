import { FC, ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { s } from 'react-native-size-matters'
import { Colors } from '../utils/colors'

interface IAppButtonProps {
  children: ReactNode,
  style?: ViewStyle
}

const AppButton: FC<IAppButtonProps> = ({children}) => {
  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Text style={styles.btnText}>{children}</Text>
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