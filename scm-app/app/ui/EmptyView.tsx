import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../utils/colors'

interface IEmptyViewProps {
  title: string
}

const EmptyView: FC<IEmptyViewProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}
export default EmptyView
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },
  title:{
    fontSize:20,
    fontWeight:"600",
    opacity:0.5,
    color: Colors.primary
  }
})