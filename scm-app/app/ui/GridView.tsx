import { JSX } from 'react'
import { StyleSheet, Text, View } from 'react-native'

interface IGridViewProps<T> {
  data: T[],
  column?: number,
  renderItem(item: T): JSX.Element
}


const GridView = <T extends unknown>(props: IGridViewProps<T>) => {
  const {data, column = 2, renderItem} = props
  return (
    <View style={styles.container}>
      {
        data.map((item, idx)=> {
          return <View style={{width:`${100/column}%`}} key={idx}>
              {renderItem(item)}
          </View>
        })
      }
    </View>
  )
}
export default GridView
const styles = StyleSheet.create({
  container:{
    flexDirection:"row",
    width:"100%",
    flexWrap:"wrap"
  }
})