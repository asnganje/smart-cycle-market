import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import { Colors } from '../utils/colors'
import { s, vs } from 'react-native-size-matters'
import { FC, useState } from 'react'

interface IFormInputProps extends TextInputProps {

}
const FormInput: FC<IFormInputProps> = (props) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <TextInput 
        {...props}
        onFocus={()=> {
          return setIsFocus(true)
        }}
        onBlur={()=> {
          return setIsFocus(false)
        }}
        style={[styles.input, isFocus ? styles.borderActive : styles.borderDeActive]}
      />
  )
}
export default FormInput
const styles = StyleSheet.create({
    input:{
    width:"100%",
    padding:s(8),
    borderRadius:s(5),
    marginBottom:vs(15)
  },
  borderDeActive:{
    borderWidth:1,
    borderColor:Colors.deActive
  },
  borderActive:{
    borderWidth:1,
    borderColor:Colors.primary
  }
})