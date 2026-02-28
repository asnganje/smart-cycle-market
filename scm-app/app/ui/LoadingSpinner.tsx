import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../utils/colors'
const LoadingSpinner = () => {
  return (
    <ActivityIndicator size="large" color={Colors.white}/>
  )
}
export default LoadingSpinner
const styles = StyleSheet.create({})