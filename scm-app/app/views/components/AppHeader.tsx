import { JSX } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import size from '../../utils/size'
import { useNavigation } from '@react-navigation/native'

interface IAppHeader {
  backButton?: JSX.Element | null,
  center?: JSX.Element | null
  right?: JSX.Element | null
}

const AppHeader = ({backButton, center, right}: IAppHeader) => {

  const { goBack, canGoBack } = useNavigation()
  return (
    <View style={styles.container}>
      {canGoBack() && <TouchableOpacity onPress={goBack}>
        {backButton}
      </TouchableOpacity>}
      {center}
      {right}
    </View>
  )
}
export default AppHeader
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    padding: size.padding
  }
})